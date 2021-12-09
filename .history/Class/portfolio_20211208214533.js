class Portfolio{
    constructor(){
        
    }

    getPriceStocks(stock, date){
        let url = `http://api.marketstack.com/v1/eod?access_key=c40428f9b00f27522b9e09f2ce2bc806&symbols=${stock}&date_from=${date}&date_to=${date}`;
        fetch(url)
        .then(resp=>JSON.parse(resp))
        .then(r=>{
            console.log('stock', r);
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
        dateIni = moment(dateIni).year(),
        dateEnd = moment(dateEnd).year(),
        dif = dateEnd - dateIni;
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
                    totalIni+=value;
                });

                Promise.all(promisesEnd)
                .then(values=>{
                    values.forEach(value=>{
                        totalEnd+=value;
                    });

                    resolve({
                        profit:totalIni - totalEnd,
                        annualized: (Math.pow(totalEnd/((totalIni == 0 )?1:totalIni) , year) - 1) * 100,
                    })
                });
            });
        });
    }
}

let portfolio = new Portfolio(),
    dateIni = moment('2021-02-05').format('YYYY-MM-DD'),
    dateEnd = moment('2021-11-30').format('YYYY-MM-DD'),
    resp = portfolio.profit(dateIni, dateEnd)
            .then((resp)=>{
                console.log('resp', resp);
            });