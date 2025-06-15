const HtmlContent = (txt: string, words: string, html: string) => {
    return (
        `
    <html>
  
  <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400;700&display=swap" rel="stylesheet">
      <style>
          body {
              padding: 5px;
              font-size: 22px;
              display: flex;

              font-family: 'Roboto Slab', serif;
              
          }

          .text-container{
          }

          .prueba{
                display:flex;
                flex-wrap: wrap;
          }
          .prueba span{
                text-align: center;
                padding: 1px 3px;
                line-height: 22px;
                
          }
          .color{
             background-color:rgb(211, 139, 153);
          }
          p,h1,h2,h3,h4,h5,h6,span{
              margin: 0;
              padding: 0;
              }

      </style>
  </head>
  
  <body>
      <div class = "text-container">
       
       <div class= "prueba">
       ${html}
       </div>
      </div>
      
      <script>
        
  
          document.addEventListener("selectionchange", function () {
              const selection = window.getSelection().toString()
              
                  window.ReactNativeWebView.postMessage(selection)
              
          })
          document.oncontextmenu = function () {
              return false
          }
  
  
         
      </script>
  </body>
  
  </html>
  `
    )
}

export default HtmlContent