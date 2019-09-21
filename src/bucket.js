class SceneManager {

	static _stopped          = false;
	static _count            = 0;

	constructor () {
		throw new Error('This is a static class');
	}

	static run() {
		this.initialize();
		this.requestUpdate();
	}

	static initialize() {
		this._count = 0;
		this._stopped = false;
		this.requestUpdate();
	}

	static requestUpdate () {
		if (!this._stopped) {
			requestAnimationFrame(this.update.bind(this));
		}
	}

	static update () {
		/*需要更新的内容*/
		console.info('ok');
		this._count++;
		if (this._count > 10) {
			this._stopped = true;
		}

		this.requestUpdate();
	}
}

export default SceneManager;