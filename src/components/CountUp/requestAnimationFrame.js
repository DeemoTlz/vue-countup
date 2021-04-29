let lastTime = 0
// 浏览器前缀，用于获取支持的 requestAnimationFrame cancelAnimationFrame 方法
const prefixes = 'webkit moz ms o'.split(' ')

// 源方法
let requestAnimationFrame
let cancelAnimationFrame

// 是否包含 window 对象
const isServer = typeof window === 'undefined'

if (isServer) {
    requestAnimationFrame = () => {}
    cancelAnimationFrame = () => {}
} else {
    requestAnimationFrame = window.requestAnimationFrame
    cancelAnimationFrame = window.cancelAnimationFrame

    // 循环遍历，尝试获取源方法
    prefixes.some(prefix => {
        // 当获取到源方法时，退出
        if (requestAnimationFrame && cancelAnimationFrame) {
            return true;
        }

        // 根据浏览器前缀尝试获取源方法
        requestAnimationFrame = requestAnimationFrame || window[prefix + 'RequestAnimationFrame']
        cancelAnimationFrame = cancelAnimationFrame || window[prefix + 'CancelAnimationFrame'] || window[prefix + 'CancelRequestAnimationFrame']
    })

    // 最终仍然未获取到，转为使用 setTimeout
    if (!requestAnimationFrame || !cancelAnimationFrame) {
        requestAnimationFrame = (callback) => {
            const currTime = new Date().getTime()
            // 为了使 setTimeout 尽可能的接近每秒60帧的效果
            const timeToCall = Math.max(0, 16 - (currTime - lastTime))
            const id = window.setTimeout(() => {
                callback(currTime + timeToCall)
            }, timeToCall)
            lastTime = currTime + timeToCall
            return id
        }

        cancelAnimationFrame = (id) => {
            window.clearTimeout(id)
        }
    }
}

export { requestAnimationFrame, cancelAnimationFrame }
