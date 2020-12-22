module.exports = ({ name, price, id }) => {
  const today = new Date();
  return `
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="utf-8">
                <title>PDF Result Template</title>
                <style>

                </style>
            </head>
        <body>
        <div class=""><p>${name} ${price} ${id}</p></div>
        </body>
    </html>
    `;
};
