/**海康视频插件1.4.0
*/
type iStartServiceSzType = "window";

type iStartServiceOptions = ".\/VideoPluginConnect.dll";
interface anyObj {
	[k: string]: any
}
interface iPromiseRes {
	success: { (): void };
	fail: { (): void }
}

type emptyFun = {
	(): void
}
/**布局模式 */
type iLayout = "1x1" | "2x2" | "3x3" | "4x4" | "5x5" | "1x2" | "1+2" | "1+5" | "1+7" | "1+8" | "1+9" | "1+12" | "1+16" | "4+9" | "1+1+12" | "3+4" | "1x4" | "4x6";
/**0关，1开 */
type openClose = 0 | 1;
type iRequestFuncName = "getRSAPubKey" | "init" | "uninit" | "startPreview" | "startPlayback" | "stopAllPreview" | "stopAllPlayback" | "getLayout" | "setLayout" | "snapShot" | "drawOSD"
type iPlayer = {
	/**传输协议
	 * 0-UDP 1-TCP 
	 * default 1
	 * */
	transMode?: 1 | 0;
	/** 是否启用 GPU 硬解
	 * 0-不启用 1-启用
	 * default:0
	*/
	gpuMode?: 0 | 1;
	/**播放窗口序号
	 * -1 或未指定-空闲窗口预览,自动下一个空闲窗口
	 * 0 选中窗口预览
	 * >0 预览wndId指定的窗口
	 */
	wndId?: number;
	/** 是否直连萤石预览
	 * 0 或未指定 非直连
	 * 其他 直连
	*/
	ezvizDirect?: 0 | 1
}
type iRequestArgument = {
	keyLenth: number;
} |
{
	/** API 网关提供的 appkey */
	appkey: string;
	/** API 网关提供的 secret*/
	secret: string;
	/** API 网关 IP 地址*/
	ip: string;
	port: number;
	/** 播放模式（决定显示预览还是回放界面），
	 * 0-预览 
	 * 1-录像播放
	 * */
	playMode?: 0 | 1;
	/**填充哪些是加密了的字段，多个间以
“，”分割，当前支持对 appkey、secret、
ip、snapDir、layout、videoDir 中的一
个或多个加密
注意:加密使用同一个公钥分别对各个字段的值加密
 */
	encryptedFields?: string;
	/**抓图存储路径 */
	snapDir?: string;
	/** 布局 */
	layout?: iLayout;
	/**紧急录像或录像剪辑存储路径 */
	videoDir?: string;
	/**是否显示工具栏 0否，1是，默认是 */
	showToolbar?: openClose;
	showSmart?: openClose;
	showIntelligent?: openClose;
	/**
	 * 工具条按钮字符串，多个之间以“,”分割
	 * 0：监 控 点 名 称 按 钮
	 * 16：关闭按钮
	 * 256：预 览 回 放 声 音
	 * 257：预 览 回 放 抓 图
	 * 258：预 览 回 放 电 子 放 大
	 * 259：预览回放显示监控点信息
	 * 260：小鹰眼
	 * 512：预览云台控制
	 * 513：-预览 3D 放大
	 * 514：预 览 语 音 对 讲
	 * 515：预 览 主 子 码 流 切 换
	 * 516：预 览 紧 急 录 像
	 * 517：预 览 即 时 回 放
	 * 768：回 放 录 像 剪 辑
	 * 769：回放录像下载
	 * 下工具条按指定按钮字符串中按钮 ID顺序来显示
	 *  */
	buttonIDs?: string;
	/** 重连次数
	 * 默认值为 0-无限重连
	 * 0-无限重连
	 * >0-重连次数
	 * <0-不重连
	*/
	reconnectTimes?: number;
	/** 重连间隔时间
	 * 默认5
	*/
	reconnectDuration?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
}
	|
	{
		/**监控点编号 */
		cameraIndexCode: string;
		/** 主子码流标识
		 * 0-主码流 1-子码流,默认0
		*/
		streamMode?: 0 | 1;

	} & iPlayer
	|
	{
		/**监控点 UUID（监控点编号） */
		cameraIndexCode: string;
		/** 回放开始时间戳
		 * 单位：秒，开始播放时间
		*/
		startTimeStamp: string;
		/** 回放结束时间戳 单位秒*/
		endTimeStamp: string;
		/**录像存储位置
		 * 0-中心存储 1-设备存储，
		 * 使用默认值 0
		 */
		recordLocation?: 0 | 1;

	} & iPlayer
	| {
		layout: iLayout;
	} |
{
	/**图片绝对路径名称，如“D:\test.jpg” */
	name?: string;
	/**播放窗口序号（有效值为 1~获取当前布局中返回的窗口数）*/
	wndId?: number;
}
	|
/**画面字符叠加 */
{
	/**待叠加字符
	 * 支持“\n”换行，不超过 512 个字符
	 */
	text: string;
	/**相对播放窗口左上角的横坐标起点 */
	x: number;
	/**相对播放窗口左上角的纵坐标起点 */
	y: number;
	/**字体颜色
	 * 默认白色
	 */
	color?: number;
	/**窗口 id */
	wndId?: number;
}
interface WebControl {
	JS_StartService: {
		(szType: iStartServiceSzType, options?: iStartServiceOptions): Promise<iPromiseRes>
	};
	/**断开服务接口 */
	JS_Disconnect: { (): Promise<iPromiseRes> };
	/**调整插件窗口大小、位置接口 */
	JS_Resize: { (iWidth: number, iHeight: number): void };
	/**创建插件窗口 */
	JS_CreateWnd: { (szId: string, iWidth: number, iHeight: number, options?: anyObj): Promise<iPromiseRes> };
	/**扣除部分插件窗口 */
	JS_CuttingPartWindow: {
		(iLeft: number, iTop: number, iWidth: number, iHeight: number): void
	};
	/** 扣除插件窗口还原*/
	JS_RepairPartWindow: {
		(iLeft: number, iTop: number, iWidth: number, iHeight: number): void
	};
	/**插件窗口隐藏 */
	JS_HideWnd: emptyFun;
	/** 插件窗口显示*/
	JS_ShowWnd: emptyFun;
	/** 插件窗口销毁*/
	JS_DestroyWnd: emptyFun;
	/** 唤醒 WebControl.exe*/
	JS_WakeUp: {
		(szProtocal: "VideoWebPlugin:\/\/"): void
	};
	JS_RequestInterface: {
		(funcName: iRequestFuncName, argument?: iRequestArgument): any
	};
	/** */
	JS_SetWindowControlCallback: {
		cbIntegrationCallBack: {
			(oData: {
				uuid: string;
				sequence: string;
				cmd: string;
				responseMsg: {
					/**
					 * 1窗口选中消息
					 * 2预览/回放播放消息
					 * 3抓图结果消息
					 * 4预览紧急录像/回放录像剪辑结果消息
					 *5进入全屏/退出全屏消息
					 */
					type: 1 | 2 | 3 | 4 | 5;
					msg: {
						wndId: number;
						/** 0x0100-正在播放 0x0200-空闲*/
						result: number;
						/**监控点编号 */
						cameraIndexcode: string;
						expand: string;
					}
				}
			}): void
		}
	}
}
/**构造函数入参 */
interface iWebControl {
	/**div id */
	szPluginContainer: string;
	/**开始端口 建议15900*/
	iServicePortStart: number;
	/**结束端口 建议15909*/
	iServicePortEnd: number;
	/**用于 IE10 使用 ActiveX 的 clsid */
	szClassId: "23BF3B0A-2C56-4D97-9C03-0CB103AA8F11";
	/** 创建 WebControl 实例成功 */
	cbConnectSuccess(): void;
	/** 创建 WebControl 实例失败，可能没有安装插件*/
	cbConnectError(): void;
	/**
	 * 插件使用过程中发生的断开与插件服务连接的回调
	 *  bNormalClose = false 时表示异常断开
	 * bNormalClose = true 时表示正常断开
	 */
	cbConnectClose(bNormalClose: boolean): void;
}
interface ioWebControlConstructor {
	new(args: iWebControl): WebControl
}

declare var WebControl: ioWebControlConstructor
