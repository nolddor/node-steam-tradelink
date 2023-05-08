const SteamID = require('steamid')

class SteamTradeLink {
    constructor(input = '') {
        this.partner = new SteamID()
        this.token = ''

        if (!input) {
            // Use the default invalid values
            return
        }

        const matches = input.match(/^https?:\/\/steamcommunity.com\/tradeoffer\/new\/\?partner=([0-9]+)&token=([a-zA-Z0-9_-]{8})$/)
        if (matches) {
            /* eslint-disable-next-line no-unused-vars */
            const [_, partner, token] = matches
            try { this.partner = SteamID.fromIndividualAccountID(partner) } catch {}
            this.token = token
        }
    }

    getToken() {
        return this.token
    }

    getPartner() {
        return this.partner
    }

    isValid() {
        return !!this.token && this.partner.isValid()
    }

    toURL() {
        if (!this.isValid()) {
            throw new Error('Unable to render invalid SteamTradeLink object')
        }

        return `https://steamcommunity.com/tradeoffer/new/?partner=${this.partner.accountid}&token=${this.token}`
    }

    static of(accountid, token) {
        return new SteamTradeLink(`https://steamcommunity.com/tradeoffer/new/?partner=${accountid}&token=${token}`)
    }
}

module.exports = SteamTradeLink
