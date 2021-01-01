module.exports = ({
  values: {
    currentUser,
    id,
    client: { label, companyName, nip, address, phone, email, discount: clientDiscount },
    dateOfRent,
    dateOfReturn,
    isFinished,
    productList,
    price,
    brutto,
    netto,
    advance,
    vat,
    discount,
    td,
  },
}) => {
  const products = productList.map(
    (product, nr) =>
      `<tr class="item">
          <td>${nr + 1}</td>

          <td colspan="12">${product[0].productName}</td>

          <td colspan="1">${product[0].unit}</td>

          <td colspan="2">${product[0].qty ? product[0].gty : 1}</td>

          <td colspan="2">${product[0].netto.toFixed(2)}</td>

          <td colspan="2">${product[0].vat}%</td>

          <td colspan="2">${product[0].netto.toFixed(2)}</td>

          <td colspan="2">${product[0].brutto.toFixed(2)}</td>
        </tr>`,
  );
  return `
  <!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>Faktura VAT </title>

    <style>
    .invoice-box {
        max-width: 800px;
        margin: auto;
        padding: 30px;
        border: 1px solid #eee;
        box-shadow: 0 0 10px rgba(0, 0, 0, .15);
        font-size: 14px;
        line-height: 24px;
        font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
        color: #555;
    }

    .invoice-box table {
        width: 100%;
        line-height: inherit;
        text-align: left;
        border-collapse: collapse
    }

    .invoice-box table td {
        padding: 5px;
        vertical-align: top;
    }

    .invoice-box table tr td:nth-child(2) {
        text-align: right;
    }

    .invoice-box table tr.top table td {
        padding-bottom: 20px;
    }

    .invoice-box table tr.top table td.title {
        font-size: 45px;
        line-height: 45px;
        color: #333;
    }

    .invoice-box table tr.information table td {
        padding-bottom: 40px;
    }

    .invoice-box table tr.information table td span {
        font-weight: bold
    }

    .invoice-box table tr.heading td {
        /* background: #eee; */
        border: 1px solid #000;
        font-size: 14px;
        font-weight: bold;
        text-align: center;
    }

    .invoice-box table tr.details td {
        padding-bottom: 20px;

    }

    .invoice-box table tr.item td {
        border: 1px solid #000;
        text-align: right;
    }

    .invoice-box table tr.item td:nth-child(2){
        text-align: left;
    }

    .invoice-box table tr.item td:nth-child(3){
        text-align: center;
    }

    .invoice-box table tr.item.last td {
        /* border-bottom: none; */
    }

    .invoice-box table tr.total td:last-child {
        border-top: 1px solid #000;
        font-weight: bold;
    }

    .invoice-box table tr.total td {
        text-align: right;
    }

    table.footer {
        margin-top: 15px;
    }

    table.footer tr:first-child td {
        text-align: center;
    }
    table.footer tr:last-child td {
        text-align: center;
        font-size: 11px;
    }

    @media only screen and (max-width: 600px) {
        .invoice-box table tr.top table td {
            width: 100%;
            display: block;
            text-align: center;
        }

        table.footer tr td {
        width: 100%;
        display: inline-block;
        text-align: center;
        }

        .invoice-box table tr.information table td {
            width: 100%;
            display: block;
            text-align: center;
        }
    }

    .under {
        margin-top: 25px;
    }

    .left {
        width: 50%;
        text-align: center;
    }

    .left * {
        border: 1px solid black;
        text-align: center;
    }


    /** RTL **/
    .rtl {
        direction: rtl;
        font-family: Tahoma, 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
    }

    .rtl table {
        text-align: right;
    }

    .rtl table tr td:nth-child(2) {
        text-align: left;
    }
    </style>
</head>

<body>
    <div class="invoice-box">
        <table cellpadding="0" cellspacing="0">
            <tr class="top">
                <td colspan="24">
                    <table>
                        <tr>
                            <td class="title">
                                <!-- <img src="../../src/assets/icons/svg" style="width:100%; max-width:300px;"> -->
                                <p>Rentapp</p>
                            </td>

                            <td>
                                Faktura nr FV: ..............<br>
                                Data wystawienia: ${td}<br>
                                Data sprzedaży: ................
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>

            <tr class="information">
                <td colspan="24">
                    <table>
                        <tr>
                            <td>
                                <span>Sprzedawca</span><br>
                                ${currentUser.companyName}<br>
                                ${currentUser.name} ${currentUser.surname}<br>
                                ${currentUser.address.street}<br>
                                ${currentUser.address.postalCode} ${currentUser.address.city}<br>
                                NIP: ${currentUser.nip}<br>
                                Tel: ${currentUser.phone}<br>
                                Email: ${currentUser.email}
                            </td>

                            <td>
                                <span>Nabywca</span><br>
                                ${companyName}<br >
                                ${label}<br>
                                ${address.street}<br>
                                ${address.postalCode} ${address.city}<br>
                                NIP: ${nip}<br>
                                Tel: ${phone}<br>
                                Email: ${email}
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>

            <!-- <tr class="heading">
                <td colspan="20">
                    Metoda płatności
                </td>

                <td colspan="4">
                    Check
                </td>
            </tr> -->
<!--
            <tr class="details">
                <td colspan="20">
                    Check
                </td>

                <td colspan="4">
                    1000
                </td>
            </tr> -->

            <tr class="heading">
                <td>
                    LP
                </td>

                <td colspan="12">
                    Nazwa
                </td>

                <td colspan="1">
                    Jedn
                </td>

                <td colspan="2">
                    Ilość
                </td>

                <td colspan="2">
                    Cena netto
                </td>

                <td colspan="2">
                    Stawka
                </td>

                <td colspan="2">
                    Wartość netto
                </td>

                <td colspan="2">
                    Wartość brutto
                </td>
            </tr>

            <!--
            <tr class="item">
              <td>1</td>

              <td colspan="12"></td>

              <td colspan="1"></td>

              <td colspan="2"></td>

              <td colspan="2"></td>

              <td colspan="2"></td>

              <td colspan="2"></td>

              <td colspan="2"></td>
            </tr>
            -->

            ${products}

            <!-- <tr class="total">
                <td colspan="20">
                </td>

                <td colspan="4">
                   Zapłacono: $385.00
                </td>
            </tr>

            <tr class="total">
                <td colspan="20">
                </td>

                <td colspan="4">
                   Do zapłaty: $385.00
                </td>
            </tr> -->

            <!-- <tr class="total">
                <td colspan="24">
                    <table>
                        <tr>
                            <td>Stawka VAT</td>
                            <td>Wartość netto</td>
                            <td>Kwota VAT</td>
                            <td>Wartość brutto</td>
                            <td colspan="2">Zapłacono: </td>
                            <td colspan="2">
                                $385.00
                             </td>
                        </tr>
                        <tr>
                            <td>23%</td>
                            <td>1</td>
                            <td>2</td>
                            <td>3</td>
                            <td colspan="2">
                                Do zapłaty: </td>
                            <td colspan="2">$385.00
                             </td>
                        </tr>
                        <tr>
                            <td>Razem: </td>
                            <td>1</td>
                            <td>2</td>
                            <td>3</td>
                            <td colspan="2">Razem: </td>
                            <td colspan="2">
                                $385.00
                             </td>
                        </tr>
                    </table>
                </td>
            </tr> -->

            <table class="under">
                <!-- <td colspan="4" class="left">
                    <table>
                        <tr>
                            <td>Stawka VAT</td>
                            <td>Wartość netto</td>
                            <td>Kwota VAT</td>
                            <td>Wartość brutto</td>

                        </tr>
                        <tr>
                            <td>23%</td>
                            <td>1</td>
                            <td>2</td>
                            <td>3</td>
                        </tr>
                        <tr>
                            <td>Razem: </td>
                            <td>1</td>
                            <td>2</td>
                            <td>3</td>
                        </tr>
                    </table>
                </td> -->
                <td>
                    <table class="right">
                        <tr class="total">
                            <td>
                                Zapłacono:
                            </td>
                            <td>
                                ${parseFloat(advance).toFixed(2)}
                             </td>
                        </tr>
                        <tr class="total">
                            <td>
                                Do zapłaty:
                            </td>
                            <td>
                                ${(price - advance).toFixed(2)}
                            </td>
                        </tr>
                        <tr class="total">
                            <td>
                                Razem:
                            </td>
                            <td>
                                ${price.toFixed(2)}
                             </td>
                        </tr>
                    </table>
                </td>
            </table>

        </table>
        <table class="footer">
            <tr>
                <td>..................................................</td>
                <td>..................................................</td>
            </tr>
            <tr>
                <td>imię i nazwisko osoby uprawnionej <br>do wystawienia faktury</p>
                <td>imię i nazwisko osoby uprawnionej <br>do odbioru faktury</td>
            </tr>
        </table>
    </div>
</body>
</html>
    `;
};
