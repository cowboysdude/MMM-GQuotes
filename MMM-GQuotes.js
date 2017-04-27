 /* Magic Mirror
    * Module: MMM-GQuotes
    *
    * By cowboysdude
    * 
    */
   
Module.register("MMM-GQuotes", {

       // Module config defaults.
       defaults: {
           updateInterval: 12*60*60*1000, // every 12 hours
           animationSpeed: 1000,
           initialLoadDelay: 1130, // 0 seconds delay
           retryDelay: 2500,
           header: "",
           maxWidth: "100%",
       },

       // Define required scripts.
       getScripts: function() {
           return ["moment.js"];
       },
       
       getStyles: function() {
           return ["MMM-GQuotes.css"];
       },

       // Define start sequence.
       start: function() {
           Log.info("Starting module: " + this.name);

           // Set locale.
           moment.locale(config.language);
           this.today = "";
           //this.gquote = [];
           this.scheduleUpdate();
       },

      getDom: function() {

         var gquote = this.gquote;
console.log(gquote);
         for (var i = 0; i < gquote.length; i++) {
            
         var gquote = gquote[i];


         var wrapper = document.createElement("div");
         wrapper.className = "wrapper";
         wrapper.style.maxWidth = this.config.maxWidth;
         

         if (!this.loaded) {
             wrapper.innerHTML = "Finding Quote....";
             wrapper.className = "bright light small";
             return wrapper;
         }
         if (this.config.header != "" ){
         var header = document.createElement("header");
         header.className = "header";
         header.innerHTML = this.config.header;
         wrapper.appendChild(header);
		 }
		 
         var top = document.createElement("div");

         var mainquote = document.createElement("h3");
         mainquote.classList.add("small", "bright", "content");
         mainquote.innerHTML = gquote.description[0];
         top.appendChild(mainquote);
		}
         wrapper.appendChild(top);
         return wrapper;

     },

     processGQuote: function(data) {
         this.today = data.Today;
         this.gquote = data;
    console.log(this.gquote);
         this.loaded = true;
     },

     scheduleUpdate: function() {
         setInterval(() => {
             this.getGQuote();
         }, this.config.updateInterval);

         this.getGQuote(this.config.initialLoadDelay);
     },

     getGQuote: function() {
         this.sendSocketNotification('GET_GQUOTE');
     },

     socketNotificationReceived: function(notification, payload) {
         if (notification === "GQUOTE_RESULT") {
             this.processGQuote(payload);
             this.updateDom(this.config.fadeSpeed);
         }
         this.updateDom(this.config.initialLoadDelay);
     },

 });
