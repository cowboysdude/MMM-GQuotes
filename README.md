# MMM-GQuote


MagicMirror 2 Daily Quote in German :)

# Install

In terminal window:
~MagicMirror/modules

     git clone https://github.com/cowboysdude/MMM-GQuotes

cd ~MagicMirror/modules/MMM-GQuotes

    npm install

# Update
    ~MagicMirror/modules/MMM-GQuotes
     git pull


# config.js entry

            { 
            disabled: false,
            module: 'MMM-GQuotes', 
            position: 'middle_center', 
            config: { 
                 maxWidth: "100%", 
                 header: "Zitat des Tages", 
                 } 
             },





# Custom css you can add and change appearance are:

.MMM-GQuotes .header and .MMM-GQuotes .content and .MMM-GQuotes .author

# Custom CSS Example: 
[changes go in ~MagicMirror/css/custom.css]
    .MMM-GQuotes .content {
    color: #f0f0f0;
    }
