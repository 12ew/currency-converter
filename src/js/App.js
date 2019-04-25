import React from 'react';
import image from '../images/cash-calculator.svg';
import data from './data/Data';
import SelectCurrency from './components/SelectCurrency';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currencies: data.currencies,
			currencyA: data.currencies[0],
			currencyB: data.currencies[1],
			currencyAVal: data.currencies[0].sellRate,
			currencyBVal: data.currencies[1].sellRate
		};

		this.onSelectCurrency = this.onSelectCurrency.bind(this);
	}

	onSelectCurrency(code) {
		console.log('Selected currency: ' + code);
		const { currencies, currencyAVal } = this.state;
		const currency = currencies.filter(currency => currency.code === code);
		this.setState({
			currencyB: currency[0],
			currencyBVal: currencyAVal * currency[0].sellRate
		});
	}

	handleChange(e, currency) {
		const { currencyA, currencyB } = this.state;

		if (currency === 'A') {
			const newValA = e.target.value;

			this.setState({
				currencyAVal: newValA,
				currencyBVal: newValA * currencyB.sellRate
			});
		} else if (currency === 'B') {
			const newValB = e.target.value;

			this.setState({
				currencyAVal: newValB / currencyB.sellRate,
				currencyBVal: newValB
			});
		}
	}

	render() {
		const {
			currencies,
			currencyA,
			currencyB,
			currencyAVal,
			currencyBVal
		} = this.state;
		return (
			<div>
				<header>
					<img src={image} />
					<h1>Currency Converter</h1>
				</header>
				<div className="content">
					<div className="row row-select-currency">
						<div className="col-md-6 col-md-offset-3">
							<h2>Select Currency</h2>
							<p>
								{
									//Select currency
								}

								<SelectCurrency
									currencies={currencies}
									onSelectCurrency={this.onSelectCurrency}
								/>
							</p>
						</div>
					</div>

					<div className="row">
						<div className="col-sm-6 currency-from-input">
							<h3 className={`currency-flag ${currencyA.code}`}>
								{currencyA.name}
							</h3>
							{
								//Currency A input
							}
							<div className="input-group">
								<span className="input-group-addon">{currencyA.sign}</span>
								<input
									type="number"
									value={currencyAVal}
									className="form-control"
									aria-describedby="basic-addon2"
									step="1"
									pattern="\d\.\d{2}"
									onChange={e => {
										this.handleChange(e, 'A');
									}}
								/>
								<span className="input-group-addon" id="basic-addon2">
									{currencyA.code}
								</span>
							</div>
						</div>
						<div className="col-sm-6 currency-to-input">
							<h3 className={`currency-flag ${currencyB.code}`}>
								{currencyB.name}
							</h3>
							{
								//Currency B input
							}
							<div className="input-group">
								<span className="input-group-addon">{currencyB.sign}</span>
								<input
									type="number"
									value={currencyBVal}
									className="form-control"
									aria-describedby="basic-addon3"
									step="1"
									pattern="\d\.\d{2}"
									onChange={e => {
										this.handleChange(e, 'B');
									}}
								/>
								<span className="input-group-addon" id="basic-addon3">
									{currencyB.code}
								</span>
							</div>
						</div>
					</div>
					<br />
					<div className="row">
						<div className="col-sm-12">
							{
								//Update to currently selected currency
							}
							<p className="text-center">
								Exchange Rate:
								{` ${currencyA.sign} ${currencyA.sellRate} ${currencyA.code}`} =
								{` ${currencyB.sign} ${currencyB.sellRate} ${currencyB.code}`}
							</p>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
