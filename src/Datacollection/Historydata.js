const historyData = [
  {
    id: 1,
    place: 'HM Building',
    date: '2023-04-01',
    time: '13:00',
    number: '001',
    price: '฿20',
    month: 'April 2023',
    image: require('../../../assets/images/hm.jpg'),
  },
  {
    id: 2,
    place: 'ECC Building',
    date: '2023-03-20',
    time: '14:00',
    number: '002',
    price: '฿20',
    month: 'March 2023',
    image: require('../../../assets/images/ecc.jpg'),
  },
  {
    id: 3,
    place: 'ECC Building',
    date: '2023-03-21',
    time: '15:00',
    number: '002',
    price: '฿20',
    month: 'March 2023',
    image: require('../../../assets/images/ecc.jpg'),
  },
  {
    id: 4,
    place: 'ECC Building',
    date: '2023-04-15',
    time: '16:00',
    number: '002',
    price: '฿20',
    month: 'April 2023',
    image: require('../../../assets/images/ecc.jpg'),
  },
  {
    id: 5,
    place: 'HM Building',
    date: '2023-04-01',
    time: '10:00',
    number: '001',
    price: '฿20',
    month: 'April 2023',
    image: require('../../../assets/images/hm.jpg'),
  },
  // Add more data here...
];

const sortedHistoryData = historyData.sort((a, b) => {
  const aDateTime = new Date(a.date + 'T' + a.time); // Combine date and time for comparison
  const bDateTime = new Date(b.date + 'T' + b.time);

  return bDateTime - aDateTime; // Sort in descending order
});

const groupedData = sortedHistoryData.reduce((acc, cur) => {
  if (!acc[cur.month]) {
    acc[cur.month] = [];
  }
  acc[cur.month].push(cur);
  return acc;
}, {});

export default Historydata;
