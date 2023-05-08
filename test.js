const SteamTradeLink = require('./index')
const SteamID = require('steamid')

const token = '6-DUbm0_'
const accountid = 1022946155
const url = `https://steamcommunity.com/tradeoffer/new/?partner=${accountid}&token=${token}`

describe('SteamTradeLink#constructor()', function() {
    test('From URL', () => {
        const tradelink = new SteamTradeLink(url)
        expect(tradelink.getToken()).toBe(token)
        expect(tradelink.getPartner().accountid).toBe(accountid)
    })

    test('From Parts', () => {
        const tradelink = SteamTradeLink.of(1022946155, token)
        expect(tradelink.getToken()).toBe(token)
        expect(tradelink.getPartner().accountid).toBe(accountid)
    })

    test('From defaults', () => {
        const tradelink = new SteamTradeLink()
        expect(tradelink.getToken()).toBe('')
        expect(tradelink.getPartner()).toEqual(new SteamID())
    })
})

describe('SteamTradeLink#isValid()', function() {
    test('Invalid when using defaults', () => {
        const tradelink = new SteamTradeLink()
        expect(tradelink.isValid()).toBe(false)
    })

    test('Invalid when using incorrect parts', () => {
        const tradelink = SteamTradeLink.of('foo', 'bar')
        expect(tradelink.isValid()).toBe(false)
    })

    test('Invalid when using incorrect URL', () => {
        const tradelink = new SteamTradeLink('www.google.es')
        expect(tradelink.isValid()).toBe(false)
    })

    test('Validate using URL', () => {
        const tradelink = new SteamTradeLink(url)
        expect(tradelink.isValid()).toBe(true)
    })

    test('Validate using parts', () => {
        const tradelink = SteamTradeLink.of(1022946155, token)
        expect(tradelink.isValid()).toBe(true)
    })
})

describe('SteamTradeLink#toURL()', function() {
    test('Throw error on invalid tradelinks', () => {
        const toURL = () => new SteamTradeLink().toURL()
        expect(toURL).toThrow(Error)
    })

    test('Render URL', () => {
        const tradelink = new SteamTradeLink(url)
        expect(tradelink.toURL()).toBe(url)
    })
})
