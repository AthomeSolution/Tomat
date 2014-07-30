BOWER			= bower
CP				= cp -r
DIR_EXISTS		= test -d
GRUNT			= grunt
MKDIR			= mkdir
NPM				= npm
PLAY			= play
RM				= rm -rf
SEP				= /

ifeq ($(OS), Windows_NT)
CP				= XCOPY /S
DIR_EXISTS		= exist
RM				= RD /S /Q
DIRTY_SEP		= \ 
SEP				= $(strip $(DIRTY_SEP))
endif

TOMAT_ROOT		= $(shell pwd)

BAASBOX_ROOT	= $(TOMAT_ROOT)$(SEP)baasbox
BAASBOX_VER		= 0.9.0-snapshot
BAASBOX_OUT		= $(BAASBOX_ROOT)$(SEP)target$(SEP)universal$(SEP)baasbox-$(BAASBOX_VER).zip

INTERFACE_ROOT	= $(TOMAT_ROOT)$(SEP)interface
INTERFACE_OUT	= $(BAASBOX_ROOT)$(SEP)public$(SEP)interface
INTERFACE_DEPS	= $(INTERFACE_ROOT)$(SEP)node_modules			\
				  $(INTERFACE_ROOT)$(SEP)app$(SEP)bower_components

all: tomat

tomat: interface baasbox

$(INTERFACE_DEPS):
	cd $(INTERFACE_ROOT) && $(NPM) install && $(BOWER) install

interface: $(INTERFACE_DEPS)
	cd $(INTERFACE_ROOT) && $(GRUNT) build
	$(DIR_EXISTS) $(INTERFACE_OUT) || $(MKDIR) $(INTERFACE_OUT)
	$(CP) $(INTERFACE_ROOT)$(SEP)dist$(SEP)* $(INTERFACE_OUT)

baasbox: $(BAASBOX_OUT)

$(BAASBOX_OUT):
	cd $(BAASBOX_ROOT) && $(PLAY) dist

clean:
	cd $(INTERFACE_ROOT) && $(GRUNT) clean
	cd $(BAASBOX_ROOT) && $(PLAY) clean

mrproper: clean
	$(DIR_EXISTS) $(INTERFACE_ROOT)$(SEP)node_modules && $(RM) $(INTERFACE_ROOT)$(SEP)node_modules
	$(DIR_EXISTS) $(INTERFACE_ROOT)$(SEP)app$(SEP)bower_components && $(RM) $(INTERFACE_ROOT)$(SEP)app$(SEP)bower_components
	$(DIR_EXISTS) $(INTERFACE_OUT) && $(RM) $(INTERFACE_OUT)
	$(DIR_EXISTS) $(BAASBOX_OUT) && $(RM) $(BAASBOX_OUT)

.PHONY: baasbox clean interface mrproper tomat
