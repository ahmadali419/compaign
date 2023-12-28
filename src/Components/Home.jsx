import ReactApexChart from 'react-apexcharts';
import { Link } from 'react-router-dom';
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import ResHome from './ResHome';
import Header from './Header';
import Navbar from './Navbar'

import React, { useState, useEffect } from 'react';

const Home = () => {
    const [selectedItems, setSelectedItems] = useState(['Spend']);
    const [statsData, setStatsData] = useState({
        Spend: {
          title: 'Spend',
          value: 0,
        },
        Impressions: {
          title: 'Impressions',
          value: 0,
        },
        Clicks: {
          title: 'Clicks',
          value: 0,
        },
        'Cost-per-click (CPC)': {
          title: 'CPC',
          value: 0,
        },
      });
    
      useEffect(() => {
        const generateRandomStats = () => {
          const dynamicStats = {};
          Object.keys(statsData).forEach((key) => {
            dynamicStats[key] = {
              title: statsData[key].title,
              value: Math.random() * 5000, // You can adjust this logic for each stat
            };
          });
    
          setStatsData((prev) => ({
            ...prev,
            ...dynamicStats,
          }));
        };
    
        generateRandomStats();
      }, [selectedItems]);
    
    const [chartData, setChartData] = useState({
      series: [],
      options: {
        chart: {
          id: 'mixed-chart',
          toolbar: {
            show: false,
          },
        },
        colors: ['#2e8cb8', '#dd7703', '#a3317b', '#587021'],
        stroke: {
          width: 2,
        },
        xaxis: {
          categories: getWeekDaysWithDate(), // Current week days
          tickAmount: 7,
        },
        yaxis: [
          {
            categories: ['0', '20', '40', '60', '80', '100'],
            show: selectedItems.includes('Spend'),
            axisTicks: {
              show: true,
            },
            axisBorder: {
              show: true,
              color: '#2e8cb8',
            },
            labels: {
              formatter: (value) => '$' + value,
              style: {
                colors: '#2e8cb8',
              },
            },
          },
          {
            categories: ['0', '2', '4', '6', '8', '10'],
            show: selectedItems.includes('Impressions'),
            opposite: false,
            axisTicks: {
              show: true,
            },
            axisBorder: {
              show: true,
              color: '#dd7703',
            },
            labels: {
              formatter: (value) => +value.toFixed(2),
              style: {
                colors: '#dd7703',
              },
            },
          },
          {
            categories: ['0', '10', '20', '30', '40', '50'],
            show: selectedItems.includes('Clicks'),
            opposite: true,
            axisTicks: {
              show: true,
            },
            axisBorder: {
              show: true,
              color: '#a3317b',
            },
            labels: {
              formatter: (value) => value.toFixed(2),
              style: {
                colors: '#a3317b',
              },
            },
          },
          {
            categories: ['0', '0.5', '1', '1.5', '2', '2.5'],
            show: selectedItems.includes('Cost-per-click (CPC)'),
            opposite: true,
            axisTicks: {
              show: true,
            },
            axisBorder: {
              show: true,
              color: '#587021',
            },
            labels: {
              formatter: (value) => '$' + value.toFixed(2),
              style: {
                colors: '#587021',
              },
            },
          },
        ],
      },
    });
  
    useEffect(() => {
      const generateRandomData = () => {
        const dynamicData = {
          Spend: Array.from({ length: 7 }, () => Math.random() * 100),
          Impressions: Array.from({ length: 7 }, () => Math.random() * 10000),
          Clicks: Array.from({ length: 7 }, () => Math.random() * 50),
          'Cost-per-click (CPC)': Array.from({ length: 7 }, () => Math.random() * 2),
        };
  
        const updatedSeries = Object.keys(dynamicData)
          .filter((key) => selectedItems.includes(key))
          .map((key) => ({
            name: key,
            type: key === 'Impressions' ? 'bar' : 'line',
            data: dynamicData[key],
          }));
  
        setChartData((prev) => ({
          ...prev,
          series: updatedSeries,
        }));
      };
  
      generateRandomData();
    }, [selectedItems]);
  
    const handleItemClick = (item) => {
      setSelectedItems((prevSelectedItems) =>
        prevSelectedItems.includes(item)
          ? prevSelectedItems.filter((selectedItem) => selectedItem !== item)
          : [...prevSelectedItems, item]
      );
    };
  
    // Helper function to get the current week days with date (e.g., "Nov 01")
    function getWeekDaysWithDate() {
      const currentDate = new Date();
      const days = Array.from({ length: 7 }, (_, index) => {
        const day = new Date(currentDate);
        day.setDate(currentDate.getDate() - currentDate.getDay() + index);
        return day.toLocaleString('default', { month: 'short', day: '2-digit' });
      });
      return days;
    }
    return (

        <>
            <Navbar />
            <div className='lg:pl-14 lg:pt-[4.7rem] h-full' >
                <div className='pb-2 border-b border-gray-200 mt-2 py-2 lg:mt-0 lg:bg-[#fbfbfc] bg-[#fbfbfc]'>
                    <p className='ml-4 text-[14px]  inline-block py-[0.350rem] px-4 rounded-full text-white  bg-[#5c687c] hover:shadow-lg cursor-pointer '>Country: United States</p>
                </div>

                <div className="lg:grid hidden grid-cols-12 gap-2 w-full h-full  " >

                    <div className='bg-[#fbfbfb] lg:col-span-2 col-span-12 lg:flex hidden text-[13px] w-full h-[34rem] flex-col px-2.5'>
                        <div className='py-3  border-b border-gray-200 w-full '>
                            <div className='rounded py-2  px-4 hover:bg-gray-200'>
                                <Link to="/" className='w-32  text-[15px]'>Portfolios</Link>
                            </div>
                        </div>
                        <Link to="/" className='py-3 px-4  font-semibold '>Campaigns</Link>
                        {/* <Link to="/" className='rounded py-2  mt-2  font-semibold  bg-[#e5e6e8]  mx-4'></Link> */}
                        <div className='w-full px-3'>
                            <div className='rounded py-2  px-2 bg-[#e5e6e8] hover:bg-gray-200'>
                                <Link to="/" className='w-32 font-semibold  text-[14px]'>Single Country</Link>
                            </div>
                        </div>
                        <Link to="/" className='flex items-center justify-between px-4 mt-1 py-2 pb-2 hover:bg-gray-200'>
                            <span className=' '>Multiple Countires</span>
                            <span className='text-white text-xs  bg-[#767676] rounded px-1'>Beta</span>
                        </Link>
                        <Link to="/" className='flex items-center justify-between mt-2 px-4 py-2 hover:bg-gray-200'>
                            Drafts
                        </Link>
                        <Link to="/" className='flex items-center justify-between px-4 pb-4 py-2 border-b border-gray-200 hover:bg-gray-200 mt-1'>
                            <span className=' '>Budgets</span>
                            <span className='text-white text-xs  bg-[#767676] rounded px-1'>Beta</span>
                        </Link>
                        <Link to="/" className='flex items-center justify-between mt-2 px-4 py-2 hover:bg-gray-200'>
                            Products
                        </Link> <Link to="/" className='flex items-center justify-between mt-2 px-4 py-2 hover:bg-gray-200'>
                            Targeting
                        </Link> <Link to="/" className='flex items-center justify-between mt-2 px-4 py-2 hover:bg-gray-200'>
                            Settings
                        </Link> <Link to="/" className='flex items-center justify-between mt-2 px-4 py-2 hover:bg-gray-200'>
                            Hsitory
                        </Link>
                    </div>

                    <div className=' lg:col-span-10 col-span-12 px-4 pt-2 '>
                        <div className='border border-gray-300'>
                        <div className='border-b border-gray-200 grid grid-cols-4'>
      {Object.keys(statsData).map((key) => (
        <div
          key={key}
          className={`hover:bg-gray-100 cursor-pointer ${
            selectedItems.includes(key) ? 'border-t-2 border-[#2e8cb8]' : 'border-none'
          }`}
          onClick={() => handleItemClick(key)}
        >
          <div className='border-r border-gray-200'>
            <p className='flex items-center space-x-1 text-[14px] px-2'>
              <span>{statsData[key].title}</span>
              <span>
                <MdOutlineKeyboardArrowDown />
              </span>
              <span className='text-lg text-gray-500'>
                <svg
                  aria-hidden='true'
                  viewBox='0 0 512 512'
                  className='sc-storm-ui-30025936__sc-1gsqp3h-0 fHDgXI fas fa-info-circle'
                  data-fa-i2svg=''
                  width='12px'
                  height='12px'
                >
                  <path
                    fill='currentColor'
                    d='M256 8c136.97 0 248 111.03 248 248S392.97 504 256 504 8 392.97 8 256 119.03 8 256 8Zm31 201.5h-62v186a31 31 0 1 0 62 0v-186ZM256 70a46.5 46.5 0 1 0 0 93 46.5 46.5 0 0 0 0-93Z'
                  />
                </svg>
              </span>
            </p>
            <p className='text-[15px] font-bold pb-1 px-2'>
              {key === 'Cost-per-click (CPC)' || key === 'Spend'
                ? `$${statsData[key].value.toFixed(2)}`
                : statsData[key].value.toFixed(0)}
            </p>
          </div>
        </div>
      ))}
    </div>
                            <div className={` px-5 w-full ${selectedItems.length === 0 ? 'h-full' : ''} `}>
                                {
                                    selectedItems.length === 0 ? <div className='flex flex-col items-center justify-center w-full  h-[23rem]'>
                                        <h1 className='text-xl font-bold'>No data</h1>
                                        <p>To see the chart, choose different metrics or filters</p>
                                    </div> : 
                                    
                                    <ReactApexChart
                                    options={chartData.options} series={chartData.series}
                                        type="line"
                                        height="370"

                                    />
                                }
                            </div>
                        </div>

                        <div>
                            <Header />
                        </div>
                    </div>
                </div>

                <div className="lg:hidden block">
                    <ResHome />
                </div>
            </div>
        </>

    )
}

export default Home
