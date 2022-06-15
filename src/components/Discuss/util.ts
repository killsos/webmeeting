let sidCounter = 0
const maxCounts = 500

export function genUid() {
    return `sid-${sidCounter++}`
}

export function genBody() {
    return {
        userName: {},
        sid: '',
        content: '',
        time: 0,
        isCreator: false,
    }
}

export function getMessages(numbers: number, delay?: boolean) {
    return new Promise((resolve) => {
        if (sidCounter >= maxCounts) {
            resolve([])
            return
        }

        setTimeout(() => {
            const messages = []
            while (numbers--) {
                let body = genBody()
                body.userName = '11111'
                body.content = 'hello world'
                body.sid = genUid()
                messages.push(body)
            }

            resolve(messages)
        })
    })
}

export function getSids(messages: any) {
    return messages.map((message: any) => message.uid)
}

export const LOAD_TYPES = {
    EMPTY: 'EMPTY',
    PAGES: 'PAGES',
    FEW: 'FEW',
}

export function setLoadType(type: string) {
    try {
        sessionStorage.setItem('LOAD_TYPES', type)
    } catch (e) {
        console.error(e)
    }
}

export function getLoadType() {
    try {
        return sessionStorage.getItem('LOAD_TYPES') || LOAD_TYPES.PAGES
    } catch (e) {
        console.error(e)
        return LOAD_TYPES.EMPTY
    }
}
