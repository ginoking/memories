export default function canPasskey() {
    return JSON.parse(localStorage.getItem('canPasskey') || 'false');
}
