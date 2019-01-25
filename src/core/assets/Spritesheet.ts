import * as THREE from 'three';
import Sprite from './Sprite';

export default class Spritesheet {
	texture: THREE.Texture;
	material: THREE.MeshBasicMaterial;

	columns: number;
	rows: number;

	tileWidth: number;
	tileHeight: number;

	sprites: Array<Sprite>;

	static MARGIN = 0.001;

	constructor(texture: THREE.Texture, columns: number, rows: number) {
		this.texture = texture.clone();

		this.columns = columns;
		this.rows = rows;
		this.tileWidth = this.texture.image.width / this.columns;
		this.tileHeight = this.texture.image.height / this.rows;

		this.texture.magFilter = THREE.NearestFilter;
		this.texture.minFilter = THREE.NearestMipMapNearestFilter;
		this.texture.needsUpdate = true;

		this.material = new THREE.MeshBasicMaterial();
		this.material.map = this.texture;
		this.material.needsUpdate = true;
		this.material.transparent = true;
		this.material.alphaTest = 0.5;

		this.sprites = [];
		this.createSprites();
	}

	createSprites() {
		for (let y = 0; y < this.columns; y++) {
			for (let x = 0; x < this.rows; x++) {
				const uv = new THREE.Vector2(
					(x % this.columns) / this.columns + Spritesheet.MARGIN,
					1 - (y + 1) / this.rows + Spritesheet.MARGIN
				);

				const size = new THREE.Vector2(
					1 / this.columns - Spritesheet.MARGIN * 2,
					-1 / this.rows + Spritesheet.MARGIN * 2
				);

				this.sprites.push({
					material: this.material,
					uv,
					size
				});
			}
		}
	}

	sprite(index: number): Sprite {
		return this.sprites[index];
	}
}
