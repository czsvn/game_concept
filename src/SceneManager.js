class SceneManager {

	static _scene            = null;
	static _nextScene        = null;
	static _stopped          = false;
	static _exiting          = false;
	static _sceneStarted     = false;
	static _previousClass    = null;

	constructor () {
		throw new Error('This is a static class');
	}

	static run (sceneClass) {
		try {
			this.initialize();
			this.goto(sceneClass)
			this.requestUpdate();
		} catch (e) {
			this.catchException(e);
		}
	}

	static initialize () {
		// 初始化 按键设置等等。。。
	}

	static requestUpdate () {
		if (!this._stopped) {
			requestAnimationFrame(this.update.bind(this));
		}
	}

	static update () {
		/*需要更新的内容*/
		try {
			this.tickStart();
			// if (Utils.isMobileSafari()) {
			// 	this.updateInputData();
			// }
			this.updateManagers();
			this.updateMain();
			this.tickEnd();
		} catch (e) {
			this.catchException(e);
		}

		this.requestUpdate();
	}

	static goto (sceneClass) {
		if (sceneClass) {
			this._nextScene = new sceneClass();
		}
		if (this._scene) {
			this._scene.stop();
		}
	}

	static catchException (e) {
		if (e instanceof Error) {
			// Graphics.printError(e.name, e.message)
			console.error(e.stack);
		} else {
			// Graphics.printError('UnknownError', e);
		}
		// AudioManager.stopAll();
		this.stop();
	}

	static tickStart () {
		// start
		// Graphics.tickStart();
	}

	static tickEnd () {
		// end
		// Graphics.tickEnd();
	}

	static updateInputData () {
		// Input.update();
		// TouchInput.update();
	}

	static updateManagers () {
		// ImageManager.update();
	}

	static updateMain () { // TODO
		this.changeScene(); // 根据条件判断是否要切换，切换后就创建 create
		this.updateScene(); // 根据条件判断是否已经存在 是否已经启动 start

		this.renderScene();

		this.requestUpdate();
	}

	static changeScene () {
		if (this.isSceneChanging() && !this.isCurrentSceneBusy()) {
			if (this._scene) {
				this._scene.terminate();
				this._previousClass = this._scene.constructor;
			}
			this._scene = this._nextScene;
			if (this._scene) {
				this._scene.create();
				this._nextScene = null;
				this._sceneStarted = false;
				this.onSceneCreate();
			}
			if (this._exiting) {
				this.terminate();
			}
		}
	}

	static updateScene () {
		if (this._scene) {
			if (!this._sceneStarted && this._scene.isReady()) {
				this._scene.start();
				this._sceneStarted = true;
				this.onSceneStart();
			}
			if (this.isCurrentSceneStarted()) {
				this._scene.update();
			}
		}
	}

	static onSceneCreate () {
		// Graphics.startLoading();
	}

	static onSceneStart () {
		// Graphics.endLoading();
	}

	static onSceneLoading () {
		// Graphics.updateLoading();
	}

	static renderScene () {
		if (this.isCurrentSceneStarted()) {
			//Graphics.render(this._scene);
		} else if (this._scene) {
			this.onSceneLoading();
		}
	}

	static isSceneChanging () {
		return this._exiting || !!this._nextScene;
	}

	static isCurrentSceneBusy () {
		return this._scene && this._scene.isBusy();
	}

	static isCurrentSceneStarted () {
		return this._scene && this._sceneStarted;
	}

	static exit () {
		this.goto(null);
		this._exiting = true;
	}

	static stop () {
		this._stopped = true;
	}

	static terminate () {
		window.close();
	}

}

export default SceneManager;