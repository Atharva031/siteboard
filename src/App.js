import React from 'react';
import './App.css';
import ProfitAndLoss from './financials.json';
import Summary from './summary.json';
import KeyRatios from './key-ratios.json';
import CurrentDividends from './current-dividend.json';
import AnalystEstimate from './analyst-estimate.json';
import CurrentOwnership from './current-ownership.json';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';

const keyRatioSummaryProfitablity = KeyRatios.Profitability;
const keyRatioSummaryFundamentals = KeyRatios.Fundamental;
const keyRatioSummaryPrice = KeyRatios.Price;
const ratioData = Summary.summary.ratio;
const keyRatioSummaryGrowth = KeyRatios.Growth;
const keyRatioSummaryDividends = KeyRatios.Dividends;
const CurrentDividendsSummary = CurrentDividends;
const ValuationRatiosSummary = KeyRatios['Valuation Ratio']
const ValuationChartSummary = Summary.summary.chart;
const AnalystEstimateSummary = AnalystEstimate.annual.date;
const annualsProfitAndLoss = ProfitAndLoss.financials.annuals;
const quarterlyProfitAndLoss = ProfitAndLoss.financials.quarterly;
const fiscalYearAnnual = annualsProfitAndLoss['Fiscal Year'];
const fiscalYearQuarter = quarterlyProfitAndLoss['Fiscal Year'];

const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#0088aa', '#ff0000'];

const fundsMetrics = [
  'Total Liabilities',
  'Total Current Liabilities',
  'Total Equity',
  'Total Assets',
  'Other Current Assets',
  'Total Current Assets'
];

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
];

const keyRatiosMetrics = [
  'PE Ratio',
  'PE Ratio without NRI',
  'Price-to-Owner-Earnings',
  'PB Ratio',
  'Price-to-Tangible-Book',
  'Price-to-Free-Cash-Flow',
  'Price-to-Operating-Cash-Flow',
  'Dividend Yield %',
  'FCF Yield %'
];

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

const perShareRevenueMetrics = [
  'Revenue per Share',
  'EBITDA per Share',
  'EBIT per Share',
  'Earnings per Share (Diluted)',
  'EPS without NRI',
  'Owner Earnings per Share (TTM)',
  'Free Cash Flow per Share',
  'Operating Cash Flow per Share',
  'Cash per Share',
  'Dividends per Share'
]

const RatiosMetrics = [
  'ROE %',
  'ROE % Adjusted to Book Value',
  'ROA %',
  'Return-on-Tangible-Equity',
  'Return-on-Tangible-Asset',
  'ROC (Joel Greenblatt) %',
  'ROCE %',
  '5-Year RORE %',
  '1-Year ROIIC %',
  'ROIC %',
  'WACC %',
  'Effective Interest Rate on Debt %',
  'Gross Margin %',
  'Operating Margin %',
  'Net Margin %',
  'EBITDA Margin %',
  'FCF Margin %',
  'Debt-to-Equity',
  'Equity-to-Asset',
  'Debt-to-Asset',
  'Liabilities-to-Assets',
  'Gross-Profit-to-Asset %',
  'Degree of Financial Leverage',
  'Asset Turnover',
  'Dividend Payout Ratio',
  'Days Sales Outstanding',
  'Days Payable',
  'Days Inventory',
  'Cash Conversion Cycle',
  'Receivables Turnover',
  'Inventory Turnover',
  'COGS-to-Revenue',
  'Inventory-to-Revenue',
  'Capex-to-Revenue',
  'Capex-to-Operating-Income',
  'Capex-to-Operating-Cash-Flow'
]

const incomeStatementMetrics = [
  'Revenue',
  'Cost of Goods Sold',
  'Gross Profit',
  'Gross Margin %',
  'Selling, General, & Admin. Expense',
  'Total Operating Expense',
  'Operating Income',
  'Operating Margin %',
  'Interest Income',
  'Interest Expense',
  'Net Interest Income',
  'Other Income (Expense)',
  'Pretax Income',
  'Tax Provision',
  'Tax Rate %',
  'Other Net Income (Loss)',
  'Net Income Including Noncontrolling Interests',
  'Net Income (Continuing Operations)',
  'Net Income (Discontinued Operations)',
  'Other Income (Minority Interest)',
  'Net Income',
  'Net Margin %',
  'EPS (Basic)',
  'EPS (Diluted)',
  'Shares Outstanding (Diluted Average)',
  'EBIT',
  'Depreciation, Depletion and Amortization',
  'EBITDA',
  'EBITDA Margin %'
]

const balanceSheetMetrics = [
  'Cash and Cash Equivalents',
  'Cash, Cash Equivalents, Marketable Securities',
  'Accounts Receivable',
  'Total Receivables',
  'Inventories, Other',
  'Total Inventories',
  'Other Current Assets',
  'Total Current Assets',
  'Land And Improvements',
  'Buildings And Improvements',
  'Machinery, Furniture, Equipments',
  'Construction In Progress',
  'Other Gross PPE',
  'Gross Property, Plant and Equipment',
  'Accumulated Depreciation',
  'Property, Plant and Equipment',
  'Intangible Assets',
  'Goodwill',
  'Other Long Term Assets',
  'Total Long-Term Assets',
  'Total Assets',
  'Accounts Payable',
  'Total Tax Payable',
  'Other Current Payables',
  'Current Accured Expense',
  'Accounts Payable & Accured Expense',
  'Short-Term Debt',
  'Short-Term Capital Lease Obligation',
  'Short-Term Debt & Capital Obligation',
  'Current Deferred Revenue',
  'Deferred Tax And Revenue',
  'Other Current Liabilities',
  'Total Current Liabilities',
  'Long-Term Debt',
  'Long-Term Capital Lease Obligation',
  'Long-Term Debt & Capital Lease Obligation',
  'Debt-to-Equity',
  'NonCurrent Deferred Liabilities',
  'Other Long-Term Liabilities',
  'Total Long-Term Liabilities',
  'Total Liabilities',
  'Common Stock',
  'Retained Earnings',
  'Accumulated other comprehensive income (loss)',
  'Additional Paid-In Capital',
  'Total Stockholders Equity',
  'Minority Interest',
  'Total Equity', 
  'Equity-to-Asset'
]

const cashFlowStatementMetrics = [
  'Net Income From Continuing Operations',
  'Cash Flow Depreciation, Depletion and Amortization',
  'Change In Receivables',
  'Change In Inventory',
  'Change In Payables And Accured Expense',
  'Change In Working Capital',
  'Deferred Tax',
  'Cash Flow from Others',
  'Cash Flow from Operations',
  'Purchase Of Property, Plant, Equipment',
  'Sale Of Property, Plant, Equipment',
  'Purchase Of Business',
  'Sale Of Business',
  'Cash From Other Investing Activities',
  'Cash Flow from Investing',
  'Repurchase of Stock',
  'Issuance of Debt',
  'Payments of Debt',
  'Net Issuance of Debt',
  'Cash Flow for Dividends',
  'Other Financing',
  'Cash Flow from Financing',
  'Beginning Cash Position',
  'Effect of Exchange Rate Changes',
  'Net Change in Cash',
  'Ending Cash Position',
  'Capital Expenditure',
  'Free Cash Flow'
]

const valuationRatiosStatementMetrics = [
  'PE Ratio',
  'PE Ratio without NRI',
  'Price-to-Owner-Earnings',
  'PB Ratio',
  'Price-to-Tangible-Book',
  'Price-to-Free-Cash-Flow',
  'Price-to-Operating-Cash-Flow',
  'PS Ratio',
  'PEG Ratio',
  'EV-to-Revenue',
  'EV-to-EBITDA',
  'EV-to-EBIT',
  'Earnings Yield (Joel Greenblatt) %',
  'Forward Rate of Return (Yacktman) %',
  'Shiller PE Ratio',
  'Cyclically Adjusted PB Ratio',
  'Cyclically Adjusted PS Ratio',
  'Cyclically Adjusted Price-to-FCF',
  'Dividend Yield %',
  'FCF Yield %'
]

const valuationAndQualityMetrics = [
  'Market Cap',
  'Enterprise Value',
  'Month End Stock Price',
  'Net Cash per Share',
  'Net Current Asset Value',
  'Net-Net Working Capital',
  'Intrinsic Value: Projected FCF',
  'Median PS Value',
  'Peter Lynch Fair Value',
  'Graham Number',
  'Earnings Power Value(EPV)',
  'Altman Z-Score',
  'Piotroski F-Score',
  'Beneish M-Score',
  'Scaled Net Operating Assets',
  'Sloan Ratio %',
  'Current Ratio',
  'Quick Ratio',
  'Cash Ratio',
  'Interest Coverage',
  'Highest Stock Price',
  'Lowest Stock Price',
  'Shares Buyback Ratio %',
  'Buyback Yield %',
  'YoY Rev. per Sh. Growth',
  'YoY EPS Growth',
  'YoY EBITDA Growth (%)',
  '5-Year EBITDA Growth Rate (Per Share)',
  'Shares Outstanding (Basic Average)',
  'Shares Outstanding (EOP)',
  'Beta',
  'Reinstated Filing Date',
  'Filing Date',
  'Earnings Release Date',
  'Number of Shareholders',
  'Number of Employees',
  'Forex Rate'
]

const financialStrengthMetrics = [
  'Cash to Debt',
  'Equity to Asset',
  'Debt-to-Equity',
  'Debt-to-Ebitda',
  'Interest Coverage',
  'WACC %',
  'ROIC %'
]

const ProfitabilityRankMetrics = [
  'Gross Margin %', //key ratios
  'Operating Margin %', //key ratios
  'Net Margin %', //From key ratios
  'FCF Margin %', //key ratios
  'ROE %', //Key Ratio
  'ROA %', //Key ratios
  'ROIC %', //key ratios
  'ROC (Joel Greenblatt) %', //key ratios
  'ROCE (%)', //financials
  'Years of Profitability over Past 10-Year' //summary
]

const MomentumRankMetrics = [
  '5-Day RSI',
  '9-Day RSI',
  '14-Day RSI',
  '6-1 Month Momentum %',
  '12-1 Month Momentum %'
]

const GrowthRankMetrics = [
  '3-Year Revenue Growth Rate (Per Share)',
  '3-Year EBITDA Growth Rate (Per Share)',
  '3-Year EPS without NRI Growth Rate',
  '3-Year FCF Growth Rate (Per Share)',
  'Future 3-5Y EPS without NRI Growth Rate',
  'Future 3-5Y Total Revenue Growth Rate'
]

const DividendandBuyBackMetrics = [
  'Dividend Yield %', //Dividend-yield
  'Dividend Payout Ratio', //Dividends
  '3-Year Dividend Growth Rate (Per Share)', //Growth
  'Forward Dividend Yield %', //Dividends
  '3-Year Share Buyback Ratio', //Fundamentals
  'Shareholder Yield %' //Fundamentals
]

const LiquidityRatioMetrics = [
  'Current Ratio',
  'Quick Ratio',
  'Cash Ratio',
  'Days Inventory',
  'Days Sales Outstanding',
  'Days Payable'
]

const GFValueRankMetrics = [
  'PE Ratio',
  'Forward PE Ratio',
  'PE Ratio without NRI',
  'Shiller PE Ratio',
  'Price-to-Owner-Earnings',
  'PEG Ratio',
  'PS Ratio',
  'PB Ratio',
  'Price-to-Tangible-Book',
  'Price-to-Free-Cash-Flow',
  'Price-to-Operating-Cash-Flow',
  'EV-to-EBIT',
  'EV-to-Forward-EBIT',
  'EV-to-EBITDA',
  'EV-to-Forward-Revenue',
  'EV-to-FCF',
  'Price-to-Projected-FCF',
  'Price-to-Median-PS-Value',
  'Price-to-Graham-Number',
  'Earnings Yield (Greenblatt)%',
  'FCF Yield %',
  'Forward Rate of Return (Yacktman) %'
]

const ValuationChartMetrics = [
  'GF Value',
  'Earnings Power Value',
  'Net Current Asset Value',
  'Tangible Book',
  'Projected FCF',
  'Median PS Value',
  'Graham Number'
]

const AnalystEstimateMetrics = [
  'date',
  'revenue_estimate',
  'ebit_estimate',
  'ebitda_estimate',
  'dividend_estimate',
  'per_share_eps_estimate',
  'eps_nri_estimate',
  'long_term_revenue_growth_rate_mean',
  'long_term_growth_rate_mean'
]

const chartValues = [
  {name: 'GF Value', value: '163.59'},
  {name: 'Earnings Power Value', value: '133.03'},
  {name: 'Net Current Asset Value', value: '-33.910'},
  {name: 'Tangible Book', value: '19.10'},
  {name: 'Projected FCF', value: '83.38'},
  {name: 'Graham Number', value: '49.50'},
]

const GFValueChart = [
  {name: 'Profitability Rank', value: '7'},
  {name: 'Growth Rank', value: '7'},
  {name: 'Financial Strength', value: '7'},
  {name: 'GF Value Rank ', value: '5'},
  {name: 'Momentum Rank', value: '10'},
]




function TableRows({ data, label }) {
  // Check if data is undefined or null, return null if so
  if (!data) return null;

  return (
    <tbody>
      {/* Render label row */}
      <tr>
        <td>{label}</td>
        {/* Check if the data is an array */}
        {Array.isArray(data) ? (
          // If data is an array, render each value
          data.map((amount, index) => <td key={index}>{amount}</td>)
        ) : (
          // If data is not an array, render the value directly
          <td>{data}</td>
        )}
      </tr>
    </tbody>
  );
}

//1
function renderSummary({ label})
{
    
    console.log(Object.keys(ratioData))
    if(ratioData && Object.keys(ratioData).length)
    { return Object.keys(ratioData).map(key => {
        if(key==label)
        { return(
          <tr >
          <td>{label}</td>  
          <td>{ratioData[key].value}</td>
          </tr>
        )  
        }
      })
    }

    if (keyRatioSummaryFundamentals && Object.keys(keyRatioSummaryFundamentals).length) {
      for (let key of Object.keys(keyRatioSummaryFundamentals)) {
        if (key === label) {
          return (
            <tr key={key}>
              <td>{label}</td>
              <td>{keyRatioSummaryFundamentals[key]}</td> {/* Access the value corresponding to the key */}
            </tr>
          );
        }
      }
    }
      return null; 
}

function RatiosSummary({ label }) {
if (keyRatioSummaryProfitablity && Object.keys(keyRatioSummaryProfitablity).length) {
  for (let key of Object.keys(keyRatioSummaryProfitablity)) {
    if (key === label) {
      return (
        <tr key={key}>
          <td>{label}</td>
          <td>{keyRatioSummaryProfitablity[key]}</td> {/* Access the value corresponding to the key */}
        </tr>
      );
    }
  }
}

//2
if (keyRatioSummaryFundamentals && Object.keys(keyRatioSummaryFundamentals).length) {
  for (let key of Object.keys(keyRatioSummaryFundamentals)) {
    if (key === label) {
      return (
        <tr key={key}>
          <td>{label}</td>
          <td>{keyRatioSummaryFundamentals[key]}</td> {/* Access the value corresponding to the key */}
        </tr>
      );
    }
  }

  
}

if(ratioData && Object.keys(ratioData).length)
{ return Object.keys(ratioData).map(key => {
    if(key==label)
    { return(
      <tr >
      <td>{label}</td>  
      <td>{ratioData[key].value}</td>
      </tr>
    )  
    }
  })
}
  return null; // Return null if keyRatioSummaryProfitablity is empty or not available
}

//3
function PriceRatiosSummary({ label }) {
  if (keyRatioSummaryPrice && Object.keys(keyRatioSummaryPrice).length) {
    for (let key of Object.keys(keyRatioSummaryPrice)) {
      if (key === label) {
        return (
          <tr key={key}>
            <td>{label}</td>
            <td>{keyRatioSummaryPrice[key]}</td> {/* Access the value corresponding to the key */}
          </tr>
        );
      }
    }
  }
  
  if (keyRatioSummaryPrice && Object.keys(keyRatioSummaryPrice).length) {
    for (let key of Object.keys(keyRatioSummaryPrice)) {
      if (key === label) {
        return (
          <tr key={key}>
            <td>{label}</td>
            <td>{keyRatioSummaryPrice[key]}</td>{/* Access the value corresponding to the key */}
          </tr>
        );
      }
    }
  }

  if(ratioData && Object.keys(ratioData).length)
    { return Object.keys(ratioData).map(key => {
        if(key==label)
        { return(
          <tr >
          <td>{label}</td>  
          <td>{ratioData[key].value}</td>
          </tr>
        )  
        }
      })
    }

    return null; // Return null if keyRatioSummaryProfitablity is empty or not available
  }

//4
function growthRatiosSummary({ label }) {
  console.log("Key Ratio Summary Growth:", keyRatioSummaryGrowth);
  console.log("Label:", label);

  if (keyRatioSummaryGrowth && Object.keys(keyRatioSummaryGrowth).length) {
    for (let key of Object.keys(keyRatioSummaryGrowth)) {
      console.log("Key in Growth Summary:", key);
      if (key === label) {
        console.log("Matching Key Found:", key);
        return (
          <tr key={key}>
            <td>{label}</td>
            <td>{keyRatioSummaryGrowth[key]}</td> {/* Access the value corresponding to the key */}
          </tr>
        );
      }
    }
  }
  return null;
}

//5
function DividendSummary({ label }) {
  if (keyRatioSummaryFundamentals && Object.keys(keyRatioSummaryFundamentals).length) {
    for (let key of Object.keys(keyRatioSummaryFundamentals)) {
      if (key === label) {
        return (
          <tr key={key}>
            <td>{label}</td>
            <td>{keyRatioSummaryFundamentals[key]}</td> {/* Access the value corresponding to the key */}
          </tr>
        );
      }
    }
  }
  
  if (keyRatioSummaryGrowth && Object.keys(keyRatioSummaryGrowth).length) {
    for (let key of Object.keys(keyRatioSummaryGrowth)) {
      console.log("Key in Growth Summary:", key);
      if (key === label) {
        console.log("Matching Key Found:", key);
        return (
          <tr key={key}>
            <td>{label}</td>
            <td>{keyRatioSummaryGrowth[key]}</td> {/* Access the value corresponding to the key */}
          </tr>
        );
      }
    }
  }

  if (CurrentDividendsSummary && Object.keys(CurrentDividendsSummary).length) {
    for (let key of Object.keys(CurrentDividendsSummary)) {
      console.log("Key in Growth Summary:", key);
      if (key === label) {
        console.log("Matching Key Found:", key);
        return (
          <tr key={key}>
            <td>{label}</td>
            <td>{CurrentDividendsSummary[key]}</td> {/* Access the value corresponding to the key */}
          </tr>
        );
      }
    }
  }

  if (keyRatioSummaryDividends && Object.keys(keyRatioSummaryDividends).length) {
    for (let key of Object.keys(keyRatioSummaryDividends)) {
      console.log("Key in Growth Summary:", key);
      if (key === label) {
        console.log("Matching Key Found:", key);
        return (
          <tr key={key}>
            <td>{label}</td>
            <td>{keyRatioSummaryDividends[key]}</td> {/* Access the value corresponding to the key */}
          </tr>
        );
      }
    }
  }

    return null; // Return null if keyRatioSummaryProfitablity is empty or not available
  }

  //6
  function LiquidityRatioSummary({ label }) {
    if (keyRatioSummaryFundamentals && Object.keys(keyRatioSummaryFundamentals).length) {
      for (let key of Object.keys(keyRatioSummaryFundamentals)) {
        if (key === label) {
          return (
            <tr key={key}>
              <td>{label}</td>
              <td>{keyRatioSummaryFundamentals[key]}</td> {/* Access the value corresponding to the key */}
            </tr>
          );
        }
      }
    }
  }

  //7
  function GFValueSummary({ label }) {
  
    if (ValuationRatiosSummary && Object.keys(ValuationRatiosSummary).length) {
      for (let key of Object.keys(ValuationRatiosSummary)) {
        if (key === label) {
          return (
            <tr key={key}>
              <td>{label}</td>
              <td>{ValuationRatiosSummary[key]}</td> {/* Access the value corresponding to the key */}
            </tr>
          );
        }
      }
    }
    return null;
  }

  //8
  function ChartSummary({ label }) {
  
    if (ValuationChartSummary && Object.keys(ValuationChartSummary).length) {
      for (let key of Object.keys(ValuationChartSummary)) {
        if (key === label) {
          return (
            <tr key={key}>
              <td>{label}</td>
              <td>{ValuationChartSummary[key]}</td> {/* Access the value corresponding to the key */}
            </tr>
          );
        }
      }
    }
    return null;
  }

function App() {
  return (
    <div className='App'>
      <div className='Table'>
        <h1>Profit and Loss (Annually)</h1>
        <table>
          <TableRows label="Fiscal Year" data={fiscalYearAnnual
        } />
          {financialMetrics.slice(1).map((metric, index) => (
            <TableRows key={index} label={metric} data={annualsProfitAndLoss.income_statement[metric]} />
          ))}
        </table>

        <h1>Profit and Loss (Quarterly)</h1>
        <table>
          <TableRows label="Fiscal Year" data={fiscalYearQuarter
        } />
          {financialMetrics.slice(1).map((metric, index) => (
            <TableRows key={index} label={metric} data={quarterlyProfitAndLoss.income_statement[metric]} />
          ))}
        </table>
      </div>

      <div className='Table'>
        <h1>Source and Application of Funds (Annually)</h1>
        <table>
          {fundsMetrics.map((metric,index) => (
            <TableRows key={index} label={metric} data={annualsProfitAndLoss.balance_sheet[metric]} />
          ))}
        </table>

        <h1>Source and Application of Funds (Quarterly)</h1>
        <table>

          {fundsMetrics.map((metric, index) => (
            <TableRows key={index} label={metric} data={quarterlyProfitAndLoss.balance_sheet[metric]} />
          ))}
        </table>
      </div>

      <div className='Table'>
        <h1>Cash Flow (Annually)</h1>
        <table>

          {cashFlowMetrics.map((metric,index) => (
            <TableRows key={index} label={metric} data={annualsProfitAndLoss.cashflow_statement[metric]} />
          ))}
        </table>

        <h1>Cash Flow (Quarterly)</h1>
        <table>

          {cashFlowMetrics.map((metric,index) => (
            <TableRows key={index} label={metric} data={quarterlyProfitAndLoss.cashflow_statement[metric]} />
          ))}
        </table>
      </div>

      <div className='Table'>
        <h1>Key Ratios (Annually)</h1>
        <table>
          {keyRatiosMetrics.map((metric,index) => (
            <TableRows key={index} label={metric} data={annualsProfitAndLoss.valuation_ratios[metric]} />
          ))}
        </table>

        <h1>Key Ratios (Quarterly)</h1>
        <table>
          {keyRatiosMetrics.map((metric,index) => (
            <TableRows key={index} label={metric} data={quarterlyProfitAndLoss.valuation_ratios[metric]} />
          ))}
        </table>
      </div>

      <div className='Table'>
        <h1>Per Share Data (Annually)</h1>
        <table>
          <TableRows label="Fiscal Year" data={fiscalYearAnnual
        } />
          {perShareRevenueMetrics.map((metric, index) => (
            <TableRows key={index} label={metric} data={annualsProfitAndLoss.per_share_data_array[metric]} />
          ))}
        </table>

        <h1>Per Share Data (Quarterly)</h1>
        <table>
          <TableRows label="Fiscal Year" data={fiscalYearQuarter
        } />
          {perShareRevenueMetrics.map((metric, index) => (
            <TableRows key={index} label={metric} data={quarterlyProfitAndLoss.per_share_data_array[metric]} />
          ))}
        </table>
      </div>

      <div className='Table'>
        <h1>Ratios (Annually)</h1>
        <table>
          <TableRows label="Fiscal Year" data={fiscalYearAnnual
        } />
          {RatiosMetrics.map((metric, index) => (
            <TableRows key={index} label={metric} data={annualsProfitAndLoss.common_size_ratios[metric]} />
          ))}
        </table>

        <h1>Ratios (Quarterly)</h1>
        <table>
          <TableRows label="Fiscal Year" data={fiscalYearQuarter
        } />
          {RatiosMetrics.map((metric, index) => (
            <TableRows key={index} label={metric} data={quarterlyProfitAndLoss.common_size_ratios[metric]} />
          ))}
        </table>
      </div>

      <div className='Table'>
        <h1>Income Statement (Annually)</h1>
        <table>
          <TableRows label="Fiscal Year" data={fiscalYearAnnual
        } />
          {incomeStatementMetrics.map((metric, index) => (
            <TableRows key={index} label={metric} data={annualsProfitAndLoss.income_statement[metric]} />
          ))}
        </table>

        <h1>Income Statement (Quarterly)</h1>
        <table>
          <TableRows label="Fiscal Year" data={fiscalYearQuarter
        } />
          {incomeStatementMetrics.map((metric, index) => (
            <TableRows key={index} label={metric} data={quarterlyProfitAndLoss.income_statement[metric]} />
          ))}
        </table>
      </div>

      <div className='Table'>
        <h1>Balance Sheet (Annually)</h1>
        <table>
          <TableRows label="Fiscal Year" data={fiscalYearAnnual
        } />
          {balanceSheetMetrics.map((metric, index) => (
            <TableRows key={index} label={metric} data={annualsProfitAndLoss.balance_sheet [metric]} />
          ))}
        </table>

        <h1>Balance Sheet(Quarterly)</h1>
        <table>
          <TableRows label="Fiscal Year" data={fiscalYearQuarter
        } />
          {balanceSheetMetrics.map((metric, index) => (
            <TableRows key={index} label={metric} data={quarterlyProfitAndLoss.balance_sheet[metric]} />
          ))}
        </table>
      </div>

      <div className='Table'>
        <h1>Cashflow Statement (Annually)</h1>
        <table>
          <TableRows label="Fiscal Year" data={fiscalYearAnnual
        } />
          {cashFlowStatementMetrics.map((metric, index) => (
            <TableRows key={index} label={metric} data={annualsProfitAndLoss.cashflow_statement [metric]} />
          ))}
        </table>

        <h1>Cashflow Statement (Quarterly)</h1>
        <table>
          <TableRows label="Fiscal Year" data={fiscalYearQuarter
        } />
          {cashFlowStatementMetrics.map((metric, index) => (
            <TableRows key={index} label={metric} data={quarterlyProfitAndLoss.cashflow_statement [metric]} />
          ))}
        </table>
      </div>

      <div className='Table'>
        <h1>Valuation Ratio (Annually)</h1>
        <table>
          <TableRows label="Fiscal Year" data={fiscalYearAnnual
        } />
          {valuationRatiosStatementMetrics.map((metric, index) => (
            <TableRows key={index} label={metric} data={annualsProfitAndLoss.valuation_ratios [metric]} />
          ))}
        </table>

        <h1>Valuation Ratio (Quarterly)</h1>
        <table>
          <TableRows label="Fiscal Year" data={fiscalYearQuarter
        } />
          {valuationRatiosStatementMetrics.map((metric, index) => (
            <TableRows key={index} label={metric} data={quarterlyProfitAndLoss.valuation_ratios [metric]} />
          ))}
        </table>
      </div>

      <div className='Table'>
        <h1>Valuation and Quality (Annually)</h1>
        <table>
          <TableRows label="Fiscal Year" data={fiscalYearAnnual
        } />
          {valuationAndQualityMetrics.map((metric, index) => (
            <TableRows key={index} label={metric} data={annualsProfitAndLoss.valuation_and_quality [metric]} />
          ))}
        </table>

        <h1>Valuation and Quality (Quarterly)</h1>
        <table>
          <TableRows label="Fiscal Year" data={fiscalYearQuarter
        } />
          {valuationAndQualityMetrics.map((metric, index) => (
            <TableRows key={index} label={metric} data={quarterlyProfitAndLoss.valuation_and_quality [metric]} />
          ))}
        </table>
      </div>

      <div className='Table'>
        <h1>Financial Strength</h1>
        <table>
          {financialStrengthMetrics.map((metric, index) => (
            renderSummary({ label: metric, key: index })
          ))}
        </table> 
      </div>

      <div className='Table'>
        <h1>Profitability Rank</h1>
        <table>
          {ProfitabilityRankMetrics.map((metric, index) => (
            RatiosSummary({ label: metric, key: index })
          ))}
        </table> 
      </div>

      <div className='Table'>
        <h1>Momentum Rank Metrics</h1>
        <table>
          {MomentumRankMetrics.map((metric, index) => (
            PriceRatiosSummary({ label: metric, key: index })
          ))}
        </table> 
      </div>

      <div className='Table'>
        <h1>Growth Rank</h1>
        <table>
          {GrowthRankMetrics.map((metric, index) => (
            growthRatiosSummary({ label: metric, key: index })
          ))}
        </table> 
      </div>

      <div className='Table'>
        <h1>Dividend Buyback</h1>
        <table>
          {DividendandBuyBackMetrics.map((metric, index) => (
            DividendSummary({ label: metric, key: index })
          ))}
        </table> 
      </div>

      <div className='Table'>
        <h1>Liquidity Ratio</h1>
        <table>
          {LiquidityRatioMetrics.map((metric, index) => (
            LiquidityRatioSummary({ label: metric, key: index })
          ))}
        </table> 
      </div>

      <div className='Table'>
        <h1>GF Value Rank</h1>
        <table>
          {GFValueRankMetrics.map((metric, index) => (
            GFValueSummary({ label: metric, key: index })
          ))}
        </table> 
      </div>

      <div className='Table'>
        <h1>Valuation Chart</h1>
        <table>
          {ValuationChartMetrics.map((metric, index) => (
            ChartSummary({ label: metric, key: index })
          ))}
        </table> 
      </div>

      <div className='Table'>
        <h1>Analyst Estimate (Annually)</h1>
        <table>
          {AnalystEstimateMetrics.map((metric, index) => (
            <TableRows key={index} label={metric} data={AnalystEstimate.annual[metric]} />
          ))}
        </table>
      </div>

      <div className='Table'>
        <h1>Analyst Estimate (Quarterly)</h1>
        <table>
          {AnalystEstimateMetrics.map((metric, index) => (
            <TableRows key={index} label={metric} data={AnalystEstimate.quarter[metric]} />
          ))}
        </table>
      </div>

      <div className='Table'>
        <h1>Key Statistics</h1>
        <table>
          <TableRows label="Revenue (TTM) (Mil $)" data={Summary.summary.company_data.revenue} />
          <TableRows label="EPS (TTM) ($)" data={KeyRatios.Fundamental['EPS (TTM)']} />
          <TableRows label="Beta" data={KeyRatios.Price.Beta} />
          <TableRows label="Volatility %" data={Summary.summary.company_data.volatility} />
          <TableRows label="14-Day RSI" data={KeyRatios.Price['14-Day RSI']} />
          <TableRows label="14-Day ATR ($)" data={Summary.summary.company_data.atr_14} />
          <TableRows label="20-Day SMA ($)" data={KeyRatios.Price['20-Day SMA']} />
          <TableRows label="12-1 Month Momentum %" data={Summary.summary.ratio['12-1 Month Momentum %'].value} />
          <TableRows label="52-Week Range ($)" data={Summary.summary.company_data.price52wlow + " - " + Summary.summary.company_data.price52whigh} />
          <TableRows label="Shares Outstanding (Mil)" data={CurrentOwnership.Share_Outstanding.value} />
        </table>
      </div>

      <div className='Table'>
        <h1>Dividend Stats</h1>
        <table>
          <TableRows label="Dividend Yield " data={KeyRatios.Dividends['Dividend Yield % (10y Low)']} />
          <TableRows label="Dividend Payout Ratio" data={KeyRatios.Dividends['Dividend Payout Ratio']} />
        </table>
      </div>

      <h1>Valuation Chart</h1>
      <div className="Chart">
        <BarChart
          width={900}
          height={400}
          layout="vertical"
          data={chartValues}
          margin={{ top: 10, right: 2, left: 5, bottom: 5 }} // Adjust margins
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" domain={['-40', '170']} /> {/* Adjust domain to prevent bars from exceeding grid lines */}
          <YAxis type="category" dataKey="name" width={150} />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" barSize={20} /> {/* Adjust bar size */}
        </BarChart>
      </div>
      
      <h1 style={{textAlign: 'center'}}>GF Score</h1>
      <div className="ChartContainer">
      <div className="ChartBox">
        <RadarChart
          cx={300}
          cy={250}
          outerRadius={150}
          width={600}
          height={500}
          data={GFValueChart}
        >
          <PolarGrid />
          <PolarAngleAxis dataKey="name" tick={{ fontSize: 14 }} />
          <PolarRadiusAxis angle={30} domain={[0, 10]} tick={{ fontSize: 12 }} />
          <Radar name="Rank" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} strokeWidth={2} />
        </RadarChart>
      </div>
    </div>
    </div>
  );
}

export default App;
