BOWER			= bower
CP				= cp -r
GRUNT			= grunt
MKDIR			= mkdir -p
NPM				= npm
PLAY			= play
RM				= rm -rf
SEP				= /

ifeq ($(OS), Windows_NT)
CP				= XCOPY /S
MKDIR			= dos\mkdir.bat
RM				= dos\rm.bat
DIRTY_SEP		= \ 
SEP				= $(strip $(DIRTY_SEP))
endif

TOMAT_ROOT		= $(shell pwd)

BAASBOX_ROOT	= $(TOMAT_ROOT)$(SEP)baasbox
BAASBOX_VER		= 0.9.0-snapshot
BAASBOX_OUT		= $(BAASBOX_ROOT)$(SEP)target$(SEP)universal$(SEP)baasbox-$(BAASBOX_VER).zip

INTERFACE_ROOT	= $(TOMAT_ROOT)$(SEP)interface
INTERFACE_OUT	= $(BAASBOX_ROOT)$(SEP)public$(SEP)interface
INTERFACE_DEPS	= $(INTERFACE_ROOT)$(SEP)node_modules				\
				  $(INTERFACE_ROOT)$(SEP)app$(SEP)bower_components

all: tomat

tomat: interface baasbox

$(INTERFACE_DEPS):
	cd $(INTERFACE_ROOT) && $(NPM) install && $(BOWER) install

build-interface: $(INTERFACE_DEPS)
	cd $(INTERFACE_ROOT) && $(GRUNT) build

interface:	build-interface
	$(MKDIR) $(INTERFACE_OUT)
	$(CP) $(INTERFACE_ROOT)$(SEP)dist$(SEP)* $(INTERFACE_OUT)



baasbox: $(BAASBOX_OUT)

$(BAASBOX_OUT):
	cd $(BAASBOX_ROOT) && $(PLAY) dist

clean:
	cd $(INTERFACE_ROOT) && $(GRUNT) clean
	cd $(BAASBOX_ROOT) && $(PLAY) clean

mrproper: clean
	$(RM) $(INTERFACE_DEPS)
	$(RM) $(INTERFACE_OUT)
	$(RM) $(BAASBOX_OUT)

.PHONY: baasbox clean interface mrproper tomat
