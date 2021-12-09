const portfolio = class Portfolio{
    constructor(){
        
    }

    getPriceStocks(date){
        let url = 'http://api.marketstack.com/v1/eod?access_key=c40428f9b00f27522b9e09f2ce2bc806&symbols=TSLA&date_from=2021-11-01&date_to=2021-11-01';
    }

    getStocks(){
        let stocks = [
            {
                nemotecnico:'LTM', price:(date)=>{
                    return Math.random() * (max - min) + min;
                }
            }
        ];

        return stocks;
    };

    profit(dateIni, dateEnd){

    }
}