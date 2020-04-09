import JSEncrypt from "jsencrypt"
import { appkey, secret, ip, port } from "./video_plugin_config"
let pubKey = ""
/**获取公钥 */
export function getPubKey(oWebControl: WebControl) {
	return new Promise((resolve, reject) => {
		if (pubKey) {
			resolve(pubKey)
		}
		oWebControl.JS_RequestInterface({
			funcName: "getRSAPubKey",
			argument: JSON.stringify({
				keyLength: 1024
			} as iRA_getPubKey)
		}).then((odata) => {
			if (odata.responseMsg.data) {
				/**1.4.0开发文档是错的，data就直接是公钥 */
				pubKey = odata.responseMsg.data
				resolve(pubKey)
			} else {
				reject(odata)
			}
		})
	})
}
/**使用公钥加密 */
export async function setEncrypt(oWebControl: WebControl, value: string, ): Promise<string> {
	const encrypt = new JSEncrypt()
	if (!pubKey) {
		await getPubKey(oWebControl)
	}
	console.log(pubKey)
	encrypt.setPublicKey(pubKey);
	return encrypt.encrypt(value)
}
/** 初始化*/
export function plugin_init(oWebControl: WebControl) {
	return new Promise(async (resolve, reject) => {
		const params: iRA_init = {
			appkey,
			secret: await setEncrypt(oWebControl, secret),
			ip,
			enableHTTPS: 1,
			port,
			playMode: 0,
			layout: "2x2",
			encryptedFields: "secret"
		}
		console.log(params)
		oWebControl.JS_RequestInterface({
			funcName: "init",
			argument: JSON.stringify(params)
		}).then(res => {
			if (res.responseMsg.code === 0) {
				oWebControl.JS_Resize(500, 300)
				console.log("===inited===")
				resolve()
			} else {
				reject(res)
			}
		}).catch(err => {
			reject(err)
		})
	})
}
/** 开始预览*/
export function startPreview(oWebControl: WebControl, cameraIndexCode: string) {
	return new Promise((resolve, reject) => {
		oWebControl.JS_RequestInterface({
			funcName: "startPreview",
			argument: JSON.stringify({ cameraIndexCode, wndId: -1, } as iRA_preview)
		}).then(res => {
			console.log(res)
			resolve()
		})
	})

}