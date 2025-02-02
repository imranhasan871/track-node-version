import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get directory paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// Detect the current Node.js version
export function detectAndStoreNodeVersion() {
	const nodeVersion = process.version.replace('v', ''); // Remove "v" prefix

	console.log(`🔍 Detecting Node.js version...`);
	console.log(`✅ Current Node.js version: ${nodeVersion}`);

	// 1. Write version to `.nvmrc`
	const nvmrcPath = path.join(projectRoot, '.nvmrc');
	fs.writeFileSync(nvmrcPath, nodeVersion, 'utf8');
	console.log(`📌 Stored Node.js version in .nvmrc`);

	// 2. Update `package.json` engines field
	const packageJsonPath = path.join(projectRoot, 'package.json');
	if (fs.existsSync(packageJsonPath)) {
		const packageJson = JSON.parse(
			fs.readFileSync(packageJsonPath, 'utf8'),
		);
		packageJson.engines = packageJson.engines || {};
		packageJson.engines.node = `>=${nodeVersion}`;

		fs.writeFileSync(
			packageJsonPath,
			JSON.stringify(packageJson, null, 2) + '\n',
			'utf8',
		);
		console.log(
			`📌 Updated Node.js version in package.json (engines field)`,
		);
	} else {
		console.warn(`⚠️ Warning: package.json not found. Skipping update.`);
	}

	console.log(`🚀 Done! Your Node.js version is now tracked.`);
}
