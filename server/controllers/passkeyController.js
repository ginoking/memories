const { 
    generateRegistrationOptions, 
    verifyRegistrationResponse, 
    generateAuthenticationOptions,
    verifyAuthenticationResponse 
} = require("@simplewebauthn/server");

const Users = require('../database/users');
const { result } = require("lodash");

const rpName = 'ginoking-memories'; // 伺服器名稱
const rpID = 'ginoking-memory-v1-client-qkusmmamqq-de.a.run.app'; // 伺服器 id，通常是網域名稱
const expectedOrigin = ['http://localhost:7070', 'http://localhost:3000']; // 允許驗證的來源

exports.registerStart = async (req, res, next) => {
    // 實際上可能是從 jwt token 取得使用者帳號
    let user = req.user;

    // 產生裝置註冊選項
    // generateRegistrationOptions 為 SimpleWebAuthn 提供的 API
    const options = await generateRegistrationOptions({
        rpName,
        rpID,
        userName: user.username,
        // Don't prompt users for additional information about the authenticator
        // (Recommended for smoother UX)
        attestationType: 'none',
        // Prevent users from re-registering existing authenticators
        excludeCredentials: user.passkeys.map(passkey => ({
            id: Buffer.from(passkey.credentialID, 'base64').toString('utf-8'),
            // Optional
            transports: passkey.transports,
        })),
        // See "Guiding use of authenticators via authenticatorSelection" below
        authenticatorSelection: {
            // Defaults
            residentKey: 'preferred',
            userVerification: 'required',
            // Optional
            authenticatorAttachment: 'platform',
            requireResidentKey: false,
        },
        ubKeyCredParams: [
            {type: 'public-key', alg: -7},
            {type: 'public-key', alg: -257},
        ],
    });

    await Users.findOneAndUpdate({ _id: user._id }, { challenge: options.challenge });

    // 回傳設定選項給前端，前端會用這些資料來註冊裝置
    res.json(options);
};

exports.registerFinish = async (req, res, next) => {

    let user = req.user;

    try {
        verification = await verifyRegistrationResponse({
            // 前端回傳資料
            response: req.body.data,
            // 預期的 challenge
            expectedChallenge: user.challenge,
            // 預期的來源
            expectedOrigin,
            // expectedRPID: rpId,
            // requireUserVerification: true
        });
    } catch (error) {
        // 驗證失敗
        return res.status(400).send({ error: error.message });
    }

    const { verified, registrationInfo } = verification;

    if (verified && registrationInfo) {
        // 註冊使用的驗證器
        const { credentialPublicKey, credentialID, counter } = registrationInfo;

        // 新的驗證器資訊
        const newAuthenticator = {
            credentialID: Buffer.from(credentialID).toString('base64'),
            credentialPublicKey: Buffer.from(credentialPublicKey).toString('base64'),
            counter,
            transports: req.body.data.response.transports,
        };

        // // (資料庫操作) 清除資料庫中目前使用者的 challenge
        const updateResult = await Users.findOneAndUpdate({ _id: user._id }, {
            challenge: '',
            passkeys: [...user.passkeys, newAuthenticator],
        });

        console.log(updateResult);

        return res.status(200).json(verified);
    }

    res.status(500).send(false);
};

exports.loginStart = async (req, res, next) => {
    const username = req.body.username;
    const user = await Users.findOne({ username });
    if (!user) {
        res.status(404).send('User not found');
    }
    // 產生裝置登入選項
    const options = await generateAuthenticationOptions({
        allowCredentials: user.passkeys.map((authenticator) => ({
            id: Buffer.from(authenticator.credentialID).toString('base64'),
            type: 'public-key',
            transports: authenticator.transports,
        })),
        userVerification: 'preferred',
    });

    await Users.findOneAndUpdate({ _id: user._id }, { challenge: options.challenge });

    // console.log(options);

    return res.json(options);
}

exports.loginFinish = async (req, res, next) => {
    const username = req.body.username;
    const user = await Users.findOne({ username });

    if (!user.passkeys || user.passkeys.length === 0) {
        res.status(400).json({
            error: "User has not register any passkey"
        })
    }

    const authenticator = user.passkeys.find(
        (device) => device.credentialID === req.body.data.id
    );

    if (!authenticator) {
        return res
            .status(400)
            .send({ error: 'User is not registered this device' });
    }

    // 執行驗證
    let verification;
    try {
        verification = await verifyAuthenticationResponse({
            response: req.body.data,
            expectedChallenge: user.challenge,
            expectedOrigin,
            expectedRPID: rpId,
            authenticator: {
                credentialID: Buffer.from(authenticator.credentialID).toString('base64'),
                credentialPublicKey: Buffer.from(authenticator.credentialPublicKey).toString('base64'),
                counter: authenticator.counter,
                transports: authenticator.transports,
            },
            requireUserVerification: false,
        });
    } catch (error) {
        console.error(error);
        return res.status(400).send({ status: error.message });
    }

    const { verified } = verification;
    if (verified) {
        // (資料庫操作) 清除使用者 challenge
        await Users.findOneAndUpdate({ _id: user._id }, { challenge: null });

        // 驗證成功，Create a token
        var token = auth.getToken({ _id: user._id });

        // Response
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        return res.json({ success: true, token: token, status: 'You are successfully logged in!', user: user });
    }

    return res.status(500).send(false);
}

exports.reset = async (req, res, next) => {
    let user = req.user;
    if (user === undefined) {
        user = await Users.findOne({ username: req.body.username });
    }

    await user.setPassword(req.body.password);
    await user.save();

    return res.json({ success: true, status: 'Reset Successful!' });
};