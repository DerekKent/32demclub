function drainQueue(){if(!draining){draining=!0;for(var e,o=queue.length;o;){e=queue,queue=[];for(var r=-1;++r<o;)e[r]();o=queue.length}draining=!1}}function noop(){}var process=module.exports={},queue=[],draining=!1;process.nextTick=function(e){queue.push(e),draining||setTimeout(drainQueue,0)},process.title="browser",process.browser=!0,process.env={},process.argv=[],process.version="",process.versions={},process.on=noop,process.addListener=noop,process.once=noop,process.off=noop,process.removeListener=noop,process.removeAllListeners=noop,process.emit=noop,process.binding=function(e){throw new Error("process.binding is not supported")},process.cwd=function(){return"/"},process.chdir=function(e){throw new Error("process.chdir is not supported")},process.umask=function(){return 0};