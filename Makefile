BOWER			= bower
CP				= cp -r
GRUNT			= grunt
MKDIR			= mkdir -p
NPM				= npm
PLAY			= play
RM				= rm -rf

TOMAT_ROOT		= $(shell pwd)

BAASBOX_ROOT	= $(TOMAT_ROOT)/baasbox
BAASBOX_VER		= 0.9.0-snapshot
BAASBOX_OUT		= $(BAASBOX_ROOT)/target/universal/baasbox-$(BAASBOX_VER).zip

INTERFACE_ROOT	= $(TOMAT_ROOT)/interface
INTERFACE_OUT	= $(BAASBOX_ROOT)/public/interface
INTERFACE_DEPS	= $(INTERFACE_ROOT)/node_modules			\
				  $(INTERFACE_ROOT)/app/bower_components

all: tomat

tomat: interface baasbox

$(INTERFACE_DEPS):
	cd $(INTERFACE_ROOT) && $(NPM) install && $(BOWER) install

interface: $(INTERFACE_DEPS)
	cd $(INTERFACE_ROOT) && $(GRUNT) build
	$(MKDIR) $(INTERFACE_OUT) && $(CP) -t $(INTERFACE_OUT) $(INTERFACE_ROOT)/dist/*

baasbox:
	cd $(BAASBOX_ROOT) && $(PLAY) dist

clean:
	cd $(INTERFACE_ROOT) && $(GRUNT) clean
	cd $(BAASBOX_ROOT) && $(PLAY) clean

mrproper: clean
	$(RM) $(INTERFACE_DEPS)
	$(RM) $(INTERFACE_OUT)
	$(RM) $(BAASBOX_OUT)

.PHONY: baasbox clean interface mrproper tomat
