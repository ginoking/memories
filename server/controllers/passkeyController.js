const { generateRegistrationOptions, verifyRegistrationResponse } = require("@simplewebauthn/server");
// import {
//     verifyRegistrationResponse,
//     VerifiedRegistrationResponse,
//     generateRegistrationOptions,
//     generateAuthenticationOptions,
//     verifyAuthenticationResponse,
//     VerifiedAuthenticationResponse,
// } from '@simplewebauthn/server';

const Users = require('../database/users');

const rpName = 'ginoking-memories'; // 伺服器名稱
const rpID = 'localhost'; // 伺服器 id，通常是網域名稱
const expectedOrigin = 'http://localhost:7070'; // 允許驗證的來源

exports.registerStart = async (req, res, next) => {
    // 實際上可能是從 jwt token 取得使用者帳號
    let user = req.user;
    let userPasskeys = [];

    // // (資料庫操作) 找出使用者目前的所有驗證器
    // const userAuthenticators = getUserRegisteredAuthenticators(username);

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
        excludeCredentials: userPasskeys.map(passkey => ({
            id: passkey.id,
            // Optional
            transports: passkey.transports,
        })),
        // See "Guiding use of authenticators via authenticatorSelection" below
        authenticatorSelection: {
            // Defaults
            residentKey: 'preferred',
            userVerification: 'preferred',
            // Optional
            authenticatorAttachment: 'platform',
        },
    });

    await Users.findOneAndUpdate({ _id: user._id }, { challenge: options.challenge });

    // 回傳設定選項給前端，前端會用這些資料來註冊裝置
    res.json(options);
};

exports.registerFinish = async (req, res, next) => {

    let user = req.user;

    console.log(req.body);

    try {
        verification = await verifyRegistrationResponse({
            // 前端回傳資料
            response: req.body.data,
            // 預期的 challenge
            expectedChallenge: user.challenge,
            // 預期的來源
            expectedOrigin,
            expectedRPID: rpId,
            requireUserVerification: true
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
            credentialID: convertBase64(credentialID),
            credentialPublicKey: convertBase64(credentialPublicKey),
            counter,
            transports: req.body.data.response.transports,
        };

        console.log(newAuthenticator);

        // // (資料庫操作) 註冊驗測器，儲存到資料庫中
        // registerUserAuthenticator(username, newAuthenticator);

        // // (資料庫操作) 清除資料庫中目前使用者的 challenge
        // clearUserRegisterChallenge(username);

        return res.status(200).json(verified);
    }

    res.status(500).send(false);
};

exports.reset = async (req, res, next) => {
    let user = req.user;
    if (user === undefined) {
        user = await Users.findOne({ username: req.body.username });
    }

    await user.setPassword(req.body.password);
    await user.save();

    return res.json({ success: true, status: 'Reset Successful!' });
};