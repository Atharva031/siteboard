import React from 'react';
import './App.css';
import ProfitAndLoss from './financials.json';

function TableRows({ data, label }) {
  return (
    <tbody>
      <tr>
        <td>{label}</td>
        {data.map((amount, index) => (
          <td key={index}>{amount}</td>
        ))}
      </tr>
    </tbody>
  );
}

function App() {
  const financialMetrics = [
    'Fiscal Year',  
    'Revenue',
    'Cost of Goods Sold',
    'Gross Profit',
    'Operating Income',
    'Pretax Income',
    'Preferred Dividends',
    'EPS (Basic)',
    'EPS (Diluted)',
    'EBIT',
    'Depreciation, Depletion and Amortization',
    'EBITDA'
  ];

  const fundsMetrics = [
    'Total Liabilities',
    'Total Current Liabilities',
    'Total Equity',
    'Total Assets',
    'Other Current Assets',
    'Total Current Assets'
  ]

  const cashFlowMetrics = [
    'Net Income From Continuing Operations',
    'Cash Flow from Operations',
    'Cash Flow from Investing',
    'Cash Flow from Financing',
    'Beginning Cash Position',
    'Effect of Exchange Rate Changes',
    'Net Change in Cash',
    'Ending Cash Position',
    'Capital Expenditure',
    'Free Cash Flow'
  ]

  const keyRatiosMetrics = [
    'PE Ratio',
    'PE Ratio without NRI',
    'Price-to-Owner-Earnings',
    'PB Ratio',
    'Price-to-Tangible-Book',
    'Price-to-Free-Cash-Flow',
    'Price-to-Operating-Cash-Flow',
    'Dividend Yield %',
    'FCF Yield %',
  ]



  const annuals = ProfitAndLoss.financials.annuals;
  const fiscalYears = annuals['Fiscal Year'];


  return (

    <div className='Table'>
      <h1>Profit and Loss</h1>
      <table>
        <TableRows label="Fiscal Year" data={fiscalYears} />
        {financialMetrics.slice(1).map((metric, index) => (
          <TableRows key={index} label={metric} data={annuals.income_statement[metric]} />
        ))}
      </table>


    <div className='Table'>
    <h1>Source and Application of Funds</h1>
    <table>
      <TableRows label="Fiscal Year" data={fiscalYears} />
      {fundsMetrics.map((metric,index) => (
        <TableRows key = {index} label = {metric} data={annuals.balance_sheet[metric]} />
      ))}
    </table>

    <div className='Table'>
    <h1>Cash Flow</h1>
    <table>
      <TableRows label="Fiscal Year" data={fiscalYears} />
      {cashFlowMetrics.map((metric,index) => (
        <TableRows key = {index} label = {metric} data={annuals.cashflow_statement[metric]} />
      ))}
    </table>

    <div className='Table'>
    <h1>Key Ratios</h1>
    <table>
      <TableRows label="Fiscal Year" data={fiscalYears} />
      {keyRatiosMetrics.map((metric,index) => (
        <TableRows key = {index} label = {metric} data={annuals.valuation_ratios[metric]} />
      ))}
    </table>

    </div>
    </div>
    </div>
    </div>
  );
}

export default App;
