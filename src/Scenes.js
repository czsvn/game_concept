// create() 创建
// start()  启动
// update() 更新
// stop()   关闭
// terminate() 切换场景时原来的场景触发
// detachReservation 切换场景时原来的场景触发
// attachReservation 切换场景时新建的场景触发
// isBusy()   判断是否繁忙
import SceneManager from './SceneManager.js'

class Stage extends PIXI.Container {
	constructor () {
		super();
		this.interactive = false;
	}
}

class SceneBase extends Stage{
	constructor () {
		super();
		this._active = false;
		this._fadeSign = 0;
		this._fadeDuration = 0;
		this._fadeSprite = null;
	}

	create () {

	}

	isActive () {
		return this._active;
	}

	isReady () {
		// return ImageManager.isReady();
		return true;
	}

	start () {
		this._active = true;
	}

	update () {
		this.updateFade();
		this.updateChildren();
	}

	stop () {
		this._active = false;
	}

	isBusy () {
		return this._fadeDuration > 0;
	}

	terminate () {

	}

	updateFade () {
		if (this._fadeDuration > 0) {
			var d = this._fadeDuration;
			if (this._fadeSign > 0) {
				this._fadeSprite.opacity = this._fadeSprite.opacity / d;
			} else {
				this._fadeSprite.opacity += (255 - this._fadeSprite.opacity) / d;
			}
			this._fadeDuration--;
		}
	}

	updateChildren () {
		this.children.forEach(child => {
			if (child.update) {
				child.update();
			}
		});
	}
}


class SceneBoot extends SceneBase {
	constructor () {
		super();
		this._startDate = Date.now();
		console.info('constructor');
	}

	create () {
		super.create.call(this)
		// DataManager.loadDatabase(); //加载数据
		// ConfigManager.load();       // 加载配置
		this.loadSystemWindowImage(); // 加载系统图像
		console.info('create');
	}

	loadSystemWindowImage () {
		// ImageManager.reserveSystem('Window')
	}

	isReady () {
		if (super.isReady.call(this)) {
			return true;
			// return DataManager.isDatabaseLoaded() && this.isGameFontLoaded;
		} else {
			return false;
		}
	}

	isGameFontLoaded () {
		// if (Graphics.isFontLoaded('GameFont')) {
		// 	return true;
		// } else if (!Graphics.canUseCssFontLoading()) {
		// 	var elapsed = Date.now() - this._startDate;
		// 	if (elapsed >= 60000) {
		// 		throw new Error('Failed to load GameFont');
		// 	}
		// }
	}

	start () {
		super.start.call(this)
		// SoundManager.preloadImportantSounds();
		// if (DataManager.isBattleTest()) {
	 //        DataManager.setupBattleTest();
	 //        SceneManager.goto(Scene_Battle);
	 //    } else if (DataManager.isEventTest()) {
	 //        DataManager.setupEventTest();
	 //        SceneManager.goto(Scene_Map);
	 //    } else {
	 //        this.checkPlayerLocation();
	 //        DataManager.setupNewGame();
	 //        SceneManager.goto(Scene_Title);
	 //        Window_TitleCommand.initCommandPosition();
	 //    }
	    this.updateDocumentTitle();
	    console.info('start');

	    SceneManager.goto(SceneTitle);


	}

	updateDocumentTitle () {
		// document.title = $dataSystem.gameTitle;
		document.title = "hello world"
	}
}

class SceneTitle extends SceneBase {
	constructor () {
		super();
	}

	create () {
		super.create.call(this);
		// this.crateBackground()
		// this.createForeground()
		// this.createWindwoLayer()
		// this.createCommandWindow()
		console.info("scenetitle create");
	}

	start () {
		super.start.call(this);
		// SceneManager.clearStack();
		// this.centerSprite(this._backSprite1);
		// this.centerSprite(this._backSprite2)
		// this.playTitleMusic();
		// this.startFadeIn(this.fadeSpeed(), false);
		console.info("scenetitle start");
	}

	update () {
		// if (!this.isBusy()) {
		// 	this._commandWindow.open();
		// }
		super.update.call(this)
		console.info("scenetitle update");
	}

	isBusy () {
		return this._commandWindow.isClosing() || super.isBusy.call(this);
	}
}


export { Stage, SceneBase, SceneBoot, SceneTitle };