import App from '../lib/app';

export function bootstrap(callback) {
	document.addEventListener('DOMContentLoaded', () => {
		const app = new App();
		app.registerComponents();
		app.initialize();

		if (typeof callback === 'function') callback();
	});
}
