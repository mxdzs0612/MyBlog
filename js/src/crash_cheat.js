<!--崩溃欺骗-->
 var OriginTitle = document.title;
 var titleTime;
 document.addEventListener('visibilitychange', function () {
     if (document.hidden) {
         $('[rel="icon"]').attr('href', "/img/TEP.ico");
         document.title = '大哥别走~！！';
         clearTimeout(titleTime);
     }
     else {
         $('[rel="icon"]').attr('href', "/favicon.ico");
         document.title = '回来就好回来就好……' + OriginTitle;
         titleTime = setTimeout(function () {
             document.title = OriginTitle;
         }, 2000);
     }
 });