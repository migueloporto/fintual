class Portfolio{
    constructor(){
        
    }

    getPriceStocks(stock, date){
        let url = `https://financialmodelingprep.com/api/v3/historical-price-full/${stock}?from=${date}&to=${date}&apikey=ea99cac4fddd1430fe8c8dfd1fb213fd`;
        return fetch(url)
        .then(res => res.json())
        .then(r=>{
            return r.historical[0].close;
        });
    }

    getStocks(){
        let stocks = [
            {name:'TSLA', price:this.getPriceStocks},
            {name:'NVDA', price:this.getPriceStocks},
            {name:'AAPL', price:this.getPriceStocks},
            {name:'AMZN', price:this.getPriceStocks},
            {name:'AMD', price:this.getPriceStocks}
        ];

        return stocks;
    }

    difDate(dateIni, dateEnd){
        dateIni = moment(dateIni).year();
        dateEnd = moment(dateEnd).year();
        let dif = dateEnd - dateIni;
        return (dif == 0)?1:dif;
    }

    profit(dateIni, dateEnd){
        return new Promise((resolve)=>{
            let stocks = this.getStocks(),
                totalIni = 0,
                totalEnd = 0,
                year = this.difDate(dateIni, dateEnd),
                promisesIni = [],
                promisesEnd = [];

            stocks.forEach(stock=>{
                promisesIni.push(stock.price(stock.name, dateIni));
                promisesEnd.push(stock.price(stock.name, dateEnd));
            });

            Promise.all(promisesIni)
            .then(values=>{
                values.forEach(value=>{
                    if( typeof value == 'number')
                        totalIni+=value;
                });

                Promise.all(promisesEnd)
                .then(values=>{
                    values.forEach(value=>{
                        if( typeof value == 'number')
                            totalEnd+=value;
                    });

                    console.log('totalEnd', totalEnd);

                    resolve({
                        profit:totalEnd - totalIni,
                        annualized: (Math.pow(totalEnd/((totalIni == 0 )?1:totalIni) , year) - 1) * 100,
                    })
                });
            });
        });
    }
}

let portfolio = new Portfolio(),
    dateIni = moment('2021-02-05').format('YYYY-MM-DD'),
    dateEnd = moment('2021-11-30').format('YYYY-MM-DD');

    portfolio.profit(dateIni, dateEnd)
    .then((resp)=>{
        console.log('resp', resp);
    });