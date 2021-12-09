class Portfolio{
    constructor(){
        
    }

    getPriceStocks(date){
        let url = 'http://api.marketstack.com/v1/eod?access_key=c40428f9b00f27522b9e09f2ce2bc806&symbols=TSLA&date_from=2021-11-01&date_to=2021-11-01';
        fetch(url)
        .then(resp=>JSON.parse(resp))
        .then(stock=>{
            console.log('stock', stock);
        })
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
    };

    profit(dateIni, dateEnd){
        return new Promise((resolve)=>{

        });
    }
}

let portfolio = new Portfolio(),
    resp = portfolio.profit()
            .then((resp)=>{
                console.log('resp', resp);
            });