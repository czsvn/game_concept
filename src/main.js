import SceneManager from './SceneManager.js'
import { SceneBoot } from './Scenes.js'

window.onload = () => {
	SceneManager.run(SceneBoot);
}