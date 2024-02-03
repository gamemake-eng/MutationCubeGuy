const createStage = (options) => {
	let app = new PIXI.Application(options);
	document.body.appendChild(app.view);

	return app;
}

const createGroup = (app) => {
	const container = new PIXI.Container();
	app.stage.addChild(container);
	return container;
}

const createSprite = (file, x, y, app, group=undefined) => {
	let rat;
	if (group != undefined) {
		rat = PIXI.Sprite.from(file);
		rat.x = x;
		rat.y = y;
		group.addChild(rat);
	}else {
		rat = PIXI.Sprite.from(file);
		rat.x = x;
		rat.y = y;
		app.stage.addChild(rat);
	}
	

	return rat;
}

const setUpdate = (update, app) => {
	app.ticker.add(update);

}

const clamp = (val, min, max) => Math.min(Math.max(val, min), max)


