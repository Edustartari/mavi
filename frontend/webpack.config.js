var path = require('path');
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');
var fs = require('fs');

// Create an entry dict
var entries = {}

console.log(path.join(__dirname, '', 'js'))

// entrypoints (include .js, .jsx, .ts, .tsx)
var folder_pool = [
	path.join(__dirname, '', 'js'),
]
// folder_pool = [ '/home/eduardo/coding/edu_projects/interviews/mavi/frontend/js' ]

for (var i = folder_pool.length - 1; i >= 0; i--) {
	var current_folder = folder_pool[i];
	
	// List all the files in the current folder
	var files = fs.readdirSync(path.join(current_folder));

	// Choose the preferred file per basename (priority: .tsx, .ts, .jsx, .js)
	const priority = ['.tsx', '.ts', '.jsx', '.js'];
	const candidates = {};

	for (var j= files.length - 1; j >= 0; j--) {
		var file = files[j];
		if (file.endsWith('.js') || file.endsWith('.jsx') || file.endsWith('.ts') || file.endsWith('.tsx')){
			const base = file.replace(/\.(js|jsx|ts|tsx)$/, '');
			candidates[base] = candidates[base] || [];
			candidates[base].push({ name: file, full: path.join(current_folder, file) });
		} else {
			let inside_files = fs.readdirSync(path.join(current_folder, file));
			for (let k= inside_files.length - 1; k >= 0; k--) {
				let inside_file = inside_files[k];
				if (inside_file.endsWith('.js') || inside_file.endsWith('.jsx') || inside_file.endsWith('.ts') || inside_file.endsWith('.tsx')){
					const base = inside_file.replace(/\.(js|jsx|ts|tsx)$/, '');
					candidates[base] = candidates[base] || [];
					candidates[base].push({ name: inside_file, full: path.join(path.join(current_folder, file), inside_file) });
				}
			}
		}
	}

	// pick highest priority candidate per base
	Object.keys(candidates).forEach((base) => {
		const filesArr = candidates[base];
		// find by priority
		let picked = null;
		for (let p = 0; p < priority.length; p++) {
			const ext = priority[p];
			const found = filesArr.find(f => f.name.endsWith(ext));
			if (found) { picked = found; break; }
		}
		if (picked) {
			entries[picked.name] = picked.full;
		}
	});
}

// entries = {
// 	'index.js': '/home/eduardo/coding/edu_projects/interviews/mavi/frontend/js/index.js',
// 	'App.js': '/home/eduardo/coding/edu_projects/interviews/mavi/frontend/js/App.js'
// }

// Get current path
let current_path = path.join(__dirname, '')
// Remove 'frontend' text from the path
let application_path = current_path.replace('frontend', '')

module.exports = {
	entry: entries,  
	output: {
		path: path.join(application_path, 'static'),
		filename: (pathData) => {
			var extension = pathData.chunk.name.split('.').pop();
			var name = pathData.chunk.name.replace('.' + extension, '');

			// Map source extensions to output extension
			let output_extension;
			if (['js', 'jsx', 'ts', 'tsx'].includes(extension)) {
				output_extension = 'js';
			} else if (extension === 'css') {
				output_extension = 'css';
			} else {
				output_extension = extension || 'js';
			}

			// Include original extension in filename to avoid collisions when both .js and .ts/.tsx entries exist
			return name + '_' + extension + '_bundle.' + output_extension
		}
	},  
	plugins: [
		new BundleTracker({
			path: __dirname,
			filename: 'webpack-stats.json'
		})
	],
    module: {
		rules: [
			{
					test: /\.(j|t)sx?$/,
					loader: 'babel-loader',
					exclude: /node_modules/,
			},
            {
                test: /\.tsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"]
            },
			{
                test: /\.(png|jpe?g|gif|webp)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            }
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js', '.jsx', '.css'],
		alias: {
		   "@": path.resolve(__dirname, ""),
			// styles: path.resolve(__dirname, "src/styles/"),
			// images: path.resolve(__dirname, "src/img/"),
		}
	},
}