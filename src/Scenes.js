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

	    SceneManager.goto(SceneGame1);


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

class SceneGame1 extends SceneBase {
	constructor() {
		super();
		this._app = null;
		this.cat = null;
		this.state = null;
	}

	create () {
		super.create.call(this)
		this.createBackground();
		// this.createForeground();
	}

	start () {
		super.start.call(this)
	}

	update () {
		super.update.call(this)
		if (this.cat) {
			this.cat.x += this.cat.vx;
			this.cat.y += this.cat.vy;
		}
	}

	createBackground () {
		console.info("sdf");
		var that = this;
		PIXI.loader
		.add("./src/test.json")
		.load( () => {
			console.info("sdf1");
			that.setup.call(that)
		});
	}

	setup () {
		this._app = new PIXI.Application({
			width: 256,         // default: 800
		    height: 256,        // default: 600
		    antialias: true,    // default: false
		    transparent: false, // default: false
		    resolution: 1       // default: 1
		});
		window.document.body.appendChild(this._app.view);
		this._app.renderer.backgroundColor = 0x061639;
		this._app.renderer.autoResize = true;
		this._app.renderer.resize(512, 512);
		let texture = PIXI.utils.TextureCache["cat.jpg"];
		this.cat = new PIXI.Sprite(texture);
		this.cat.vx = 0;
		this.cat.vy = 0;
		this._app.stage.addChild(this.cat);
		this.createForeground();
	}

	createForeground () {
		let left = this.keyboard(37),
		    up = this.keyboard(38),
		    right = this.keyboard(39),
		    down = this.keyboard(40);
		let cat = this.cat;
	    left.press = () => {
	    	console.info("left");
		    cat.vx = -5;
		    cat.vy = 0;
	    }
	    left.release = () => {
		    if (!right.isDown && cat.vy === 0) {
		        cat.vx = 0;
		    }
	    }

	    //Up
	    up.press = () => {
		    cat.vy = -5;
		    cat.vx = 0;
	    };
	    up.release = () => {
		    if (!down.isDown && cat.vx === 0) {
		        cat.vy = 0;
		    }
	    };

	    //Right
	    right.press = () => {
		    cat.vx = 5;
		    cat.vy = 0;
	    };
	    right.release = () => {
		    if (!left.isDown && cat.vy === 0) {
		        cat.vx = 0;
		    }
	    };

	    //Down
	    down.press = () => {
		    cat.vy = 5;
		    cat.vx = 0;
	    };
	    down.release = () => {
		    if (!up.isDown && cat.vx === 0) {
		        cat.vy = 0;
		    }
	    };
	}

	keyboard (keyCode) {
		let key = {};
	    key.code = keyCode;
	    key.isDown = false;
	    key.isUp = true;
	    key.press = undefined;
	    key.release = undefined;

	    // The downHandler
	    key.downHandler = event => {
	        if (event.keyCode === key.code) {
	            if (key.isUp && key.press) {
	                key.press();
	            }
	            key.isDown = true;
	            key.isUp = false;
	        }
	        event.preventDefault();
	    };

	    // The upHandler
	    key.upHandler = event => {
	        if (event.keyCode === key.code) {
	            if (key.isDown && key.release) {
	                key.release();
	            }
	            key.isDown = false;
	            key.isUp = true;
	        }
	        event.preventDefault();
	    };

	    window.addEventListener(
	        "keydown", key.downHandler.bind(key), false
	    );

	    window.addEventListener(
	        "keyup", key.upHandler.bind(key), false
	    );
	    return key;
	}

}


export { Stage, SceneBase, SceneBoot, SceneTitle };