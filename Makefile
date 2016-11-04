install:
	npm install

publish: install
	npm publish

version-up-minor:
	git status -s |wc -l|xargs -n 1 test 0 -eq
	git br |grep '* master'
	npm version minor
	$(MAKE) publish

version-up-patch:
	git status -s |wc -l|xargs -n 1 test 0 -eq
	git br |grep '* master'
	npm version patch
	$(MAKE) publish
