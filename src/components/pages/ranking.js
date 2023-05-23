import React, { useState, useEffect, createContext, useContext } from "react";
import Select from 'react-select'
import Footer from '../components/footer';
import { createGlobalStyle } from 'styled-components';
import humanFormat from "human-format";
import { APIs } from '../../util/fetcher';

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.sticky.white {
    background: #403f83;
    border-bottom: solid 1px #403f83;
  }
  header#myHeader.navbar .search #quick_search{
    color: #fff;
    background: rgba(255, 255, 255, .1);
  }
  header#myHeader.navbar.white .btn, .navbar.white a, .navbar.sticky.white a{
    color: #fff;
  }
  header#myHeader .dropdown-toggle::after{
    color: rgba(255, 255, 255, .5);;
  }
  header#myHeader .logo .d-block{
    display: none !important;
  }
  header#myHeader .logo .d-none{
    display: block !important;
  }
  @media only screen and (max-width: 1199px) {
    .navbar{
      background: #403f83;
    }
    .navbar .menu-line, .navbar .menu-line1, .navbar .menu-line2{
      background: #fff;
    }
    .item-dropdown .dropdown a{
      color: #fff !important;
    }
  }
`;


const customStyles = {
  option: (base, state) => ({
    ...base,
    background: "#fff",
    color: "#727272",
    borderRadius: state.isFocused ? "0" : 0,
    "&:hover": {
      background: "#ddd",
    }
  }),
  menu: base => ({
    ...base,
    background: "#fff !important",
    borderRadius: 0,
    marginTop: 0
  }),
  menuList: base => ({
    ...base,
    padding: 0
  }),
  control: (base, state) => ({
    ...base,
    padding: 2
  })
};


const options = [
  { value: 1, label: 'Last 1 Hour' },
  { value: 6, label: 'Last 6 Hours' },
  { value: 24, label: 'Last 24 hours' },
  { value: 24 * 7, label: 'Last 7 days' },
  { value: 24 * 30, label: 'Last 30 days' },
  { value: 24 * 90, label: 'Last 90 days' },
  { value: 9999, label: 'All time' }
]
const options1 = [
  { value: 0, label: 'All Markets' },
  { value: 1, label: 'Sentient' },
]


const Page = () => {
  const [collections, setCollections] = useState([]);
  const [range, setRange] = useState(24);
  const [source, setSource] = useState(0); // 0 - all, 1 - sentient
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    (async () => {
      setLoading(true)
      setCollections([])
      try {
        const { data } = await APIs.post('/nft/getPopularCollection', { range, source });
        if (data.result)
          setCollections(data.data)
        else
          console.log(data.message)
        setLoading(false)
      } catch (error) {
        console.log(error.message)
        setLoading(false)
      }
    })();
  }, [range, source])

  return (<div>
    <GlobalStyles />
    <section className='jumbotron breadcumb no-bg' style={{ backgroundImage: `url(${'./img/background/subheader.jpg'})` }}>
      <div className='mainbreadcumb'>
        <div className='container'>
          <div className='row m-10-hor'>
            <div className='col-12'>
              <h1 className='text-center'>Top NFTs</h1>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className='container'>
      <div className='row'>
        <div className='col-lg-12'>

          <div className="items_filter centerEl">
            <div className='dropdownSelect one'><Select className='select1' styles={customStyles} menuContainerStyle={{ 'zIndex': 999 }} defaultValue={options[2]} options={options} onChange={(option) => setRange(option.value)} /></div>
            <div className='dropdownSelect two'><Select className='select1' styles={customStyles} defaultValue={options1[0]} options={options1} onChange={(option) => setSource(option.value)} /></div>
          </div>

          <table className="table de-table table-rank">
            <thead>
              <tr>
                {/* <th scope="col">Rank</th> */}
                <th scope="col">Collection</th>
                <th scope="col">Volume</th>
                <th scope="col">Chg.%</th>
                <th scope="col">Avg.Sale</th>
                <th scope="col">Chg.%</th>
                <th scope="col">Sales</th>
                <th scope="col">Volume Total</th>
              </tr>
              <tr></tr>
            </thead>
            {loading ?
              <p>loading...</p>
              :
              <tbody>
                {collections.map((item, index) =>
                  <tr key={index}>
                    {/* <td>#{index + 1}</td> */}
                    <th scope="row">
                      <div className="coll_list_pp">
                        <img className="lazy" src={"https://sentx.io/cdn-cgi/image/width=200,quality=85/https://ipfs-cdn.sentx.io/" + item?.imagecid.replace('ipfs://', '')} alt="" />
                        {/* <i className="fa fa-check"></i> */}
                      </div>
                      {item.name}</th>
                    <td>
                      <img className="lazy" src="./img/hedera.png" alt="" height="20px" /> {Number(item.volume) ? humanFormat(Number(item.volume)) : ''}
                    </td>
                    {
                      item.volumechg ?
                        (item.volumechgcolor == 'success' ?
                          <td className="d-plus">+{item.volumechg}%</td>
                          :
                          <td className="d-min">-{item.volumechg}%</td>)
                        :
                        <td className="d-plus"></td>
                    }
                    <td>
                      <img className="lazy" src="./img/hedera.png" alt="" height="20px" />{Number(item.avgsale) ? humanFormat(Number(item.avgsale)) : ''}
                    </td>
                    {
                      item.avgsalechg ?
                        (item.avgsalechgcolor == 'success' ?
                          <td className="d-plus">+{item.avgsalechg}%</td>
                          :
                          <td className="d-min">-{item.avgsalechg}%</td>)
                        :
                        <td className="d-plus"></td>
                    }
                    <td>{item.sales}</td>
                    <td>
                      <img className="lazy" src="./img/hedera.png" alt="" height="20px" /> {Number(item.volumetotal) ? humanFormat(Number(item.volumetotal)) : ''}
                    </td>
                  </tr>
                )}
              </tbody>}

          </table>

          <div className="spacer-double"></div>

          {/* <ul className="pagination justify-content-center">
            <li className="active"><span>1 - 20</span></li>
            <li><span>21 - 40</span></li>
            <li><span>41 - 60</span></li>
          </ul> */}

        </div>
      </div>
    </section>


    <Footer />
  </div>)
};

export default Page;