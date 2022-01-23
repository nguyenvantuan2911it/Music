release:
	next build
	rsync -aP --no-o --no-g  -e 'ssh -Snone' --exclude=.git --exclude=.idea --exclude=logs --exclude=.vscode --exclude=node_modules --exclude=src ./ root@66.42.99.232:sgm.web/app
	ssh root@66.42.99.232 'cd sgm.web/app && npm i && pm2 start "npm run start" --name "SGM"'
update:
	next build
	rsync -aP --no-o --no-g  -e 'ssh -Snone' --exclude=.git --exclude=.idea --exclude=logs --exclude=.vscode --exclude=node_modules --exclude=src ./ root@66.42.99.232:sgm.web/app
	ssh root@66.42.99.232 'cd sgm.web/app && npm i && pm2 restart SGM'
