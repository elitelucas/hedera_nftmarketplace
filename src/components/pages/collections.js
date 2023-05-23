import React, { useState, useEffect, Component } from "react";
import Footer from '../components/footer';
import { createGlobalStyle } from 'styled-components';

import humanFormat from "human-format";
import { APIs } from '../../util/fetcher';

const GlobalStyles = createGlobalStyle`
  .navbar {
    border-bottom: solid 1px rgba(255, 255, 255, .1) !important;
  }
`;

const Collections = () => {

  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    (async () => {
      setLoading(true)
      setCollections([])
      try {
        const { data } = await APIs.post('/nft/getCollections', { amount: 100 });
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
  }, [])


  /**
   * 
   * {
  "nftexplorercollectionid": 705,
  "royaltiesTotal": 0.07,
  "friendlyurl": "siwas-by-kabila-0.0.2179656",
  "image": "ipfs://bafybeihm2xbnq2uu3yjibzrdapmozld2xwme3ol2a6ivkrdb3y626ss64q/SIWA1.png",
  "author": null,
  "name": "SIWAS by Kabila",
  "marketplaceEnabled": 1,
  "nftcount": 1000,
  "imagetype": "image/png",
  "token_id": "0.0.2179656",
  "address": "0.0.2179656",
  "tokenaddress": "0.0.2179656",
  "isDomainName": 0,
  "cimagecid": "ipfs://bafybeihm2xbnq2uu3yjibzrdapmozld2xwme3ol2a6ivkrdb3y626ss64q/SIWA1.png",
  "creatorfriendlyurl": null,
  "twitter": null,
  "discord": null,
  "website": null,
  "adescription": null,
  "floorprice": 2450,
  "vol": null,
  "volprev": 3600,
  "voltotal": 9849,
  "chg": "100.0",
  "chgcolor": "warning",
  "chgicon": "ri-arrow-down-s-fill"
}


    {
      nftLink: "#",
      bidLink: "#",
      previewImg: "./img/items/static-1.jpg",
      title: "Pinky Ocean",
      price: "0.08 ETH",
      bid: "1/20",
      likes: 50
    }
   */
  const [showingData, setShowingData] = useState([]);

  useEffect(() => {
    // Perform mapping operation when the originalArray changes
    const mappedData = collections.map(item => {
      var imagepath;
      if (item?.image.startsWith('https://')) {
        imagepath = item?.image;
      } else {
        imagepath = "https://sentx.io/cdn-cgi/image/width=200,quality=85/https://ipfs-cdn.sentx.io/" + item?.image.replace('ipfs://', '');     
      }

      return {
        nftLink: "#",
        bidLink: "#",
        previewImg: imagepath,
        title: item.name,
        price: item.floorprice,
        likes: item.nftcount,
        imagetype: item.imagetype
      };
    });

    setShowingData(mappedData);
  }, [collections]);


  return (<div>
    <GlobalStyles />
    <section className='container'>
      <div className='row'>
        <div className="spacer-double"></div>

        <div className='col-md-3'>

          <div className="item_filter_group">
            <h4>Select Categories</h4>
            <div className="de_form">
              <div className="de_checkbox">
                <input id="check_cat_1" name="check_cat_1" type="checkbox" value="check_cat_1" />
                <label htmlFor="check_cat_1">Art</label>
              </div>

              <div className="de_checkbox">
                <input id="check_cat_2" name="check_cat_2" type="checkbox" value="check_cat_2" />
                <label htmlFor="check_cat_2">Music</label>
              </div>

              <div className="de_checkbox">
                <input id="check_cat_3" name="check_cat_3" type="checkbox" value="check_cat_3" />
                <label htmlFor="check_cat_3">Domain Names</label>
              </div>

              <div className="de_checkbox">
                <input id="check_cat_4" name="check_cat_4" type="checkbox" value="check_cat_4" />
                <label htmlFor="check_cat_4">Virtual World</label>
              </div>

              <div className="de_checkbox">
                <input id="check_cat_5" name="check_cat_5" type="checkbox" value="check_cat_5" />
                <label htmlFor="check_cat_5">Trading Cards</label>
              </div>

              <div className="de_checkbox">
                <input id="check_cat_6" name="check_cat_6" type="checkbox" value="check_cat_6" />
                <label htmlFor="check_cat_6">Collectibles</label>
              </div>

              <div className="de_checkbox">
                <input id="check_cat_7" name="check_cat_7" type="checkbox" value="check_cat_7" />
                <label htmlFor="check_cat_7">Sports</label>
              </div>

              <div className="de_checkbox">
                <input id="check_cat_8" name="check_cat_8" type="checkbox" value="check_cat_8" />
                <label htmlFor="check_cat_8">Utility</label>
              </div>

            </div>
          </div>

          <div className="item_filter_group">
            <h4>Status</h4>
            <div className="de_form">
              <div className="de_checkbox">
                <input id="buy" name="buy" type="checkbox" value="buy" />
                <label htmlFor="buy">Buy Now</label>
              </div>

              <div className="de_checkbox">
                <input id="onauction" name="onauction" type="checkbox" value="onauction" />
                <label htmlFor="onauction">On Auction</label>
              </div>

              <div className="de_checkbox">
                <input id="offers" name="offers" type="checkbox" value="offers" />
                <label htmlFor="offers">has Offers</label>
              </div>

            </div>
          </div>

          <div className="item_filter_group">
            <h4>Items Type</h4>
            <div className="de_form">
              <div className="de_checkbox">
                <input id="sitems" name="sitems" type="checkbox" value="sitems" />
                <label htmlFor="sitems">Single Items</label>
              </div>

              <div className="de_checkbox">
                <input id="bundles" name="bundles" type="checkbox" value="bundles" />
                <label htmlFor="bundles">Bundles</label>
              </div>

            </div>
          </div>

          <div className="item_filter_group">
            <h4>Collections</h4>
            <div className="de_form">
              <div className="de_checkbox">
                <input id="abstract" name="abstract" type="checkbox" value="abstract" />
                <label htmlFor="abstract">Abstraction</label>
              </div>

              <div className="de_checkbox">
                <input id="paterns" name="paterns" type="checkbox" value="paterns" />
                <label htmlFor="paterns">Patternlicious</label>
              </div>

              <div className="de_checkbox">
                <input id="skecth" name="skecth" type="checkbox" value="skecth" />
                <label htmlFor="skecth">Skecthify</label>
              </div>

              <div className="de_checkbox">
                <input id="cartoon" name="cartoon" type="checkbox" value="cartoon" />
                <label htmlFor="cartoon">Cartoonism</label>
              </div>

              <div className="de_checkbox">
                <input id="virtualand" name="virtualand" type="checkbox" value="virtualand" />
                <label htmlFor="virtualand">Virtuland</label>
              </div>

              <div className="de_checkbox">
                <input id="pappercut" name="pappercut" type="checkbox" value="pappercut" />
                <label htmlFor="pappercut">Papercut</label>
              </div>

            </div>
          </div>

        </div>

        <div className="col-md-9">
          {loading ?
            <p>loading...</p>
            :
            <MyColumn dummyData={showingData} />}
        </div>
      </div>
    </section>


    <Footer />
  </div>);
};



/**
 * No need to touch
 */
class MyColumn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dummyData: props.dummyData,
      nfts: props.dummyData.slice(0, 8),
      height: 0
    };
    this.onImgLoad = this.onImgLoad.bind(this);
  }

  loadMore = () => {
    let nftState = this.state.nfts
    let start = nftState.length
    let end = nftState.length + 8
    this.setState({
      nfts: [...nftState, ...(this.state.dummyData.slice(start, end))]
    });
  }

  onImgLoad({ target: img }) {
    let currentHeight = this.state.height;
    if (currentHeight < img.offsetHeight) {
      this.setState({
        height: img.offsetHeight
      })
    }
  }


  render() {
    return (
      <div className='row'>
        {this.state.nfts.map((nft, index) => (
          <div key={index} className="d-item col-lg-3 col-md-4 col-sm-6 col-xs-12 mb-4">
            <div className="nft__item m-0">
              <div className="nft__item_wrap" style={{ height: `${this.state.height}px` }}>
                <span>
                  {
                    nft.imagetype?.startsWith('image') ?
                      <img onLoad={this.onImgLoad} src={nft.previewImg} className="lazy nft__item_preview" alt="" />
                      :
                      <video width="100%" loop playsinline autoPlay muted controls={false}>
                        <source src={nft.previewImg} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                  }
                </span>
              </div>
              <div className="nft__item_info">
                <span onClick={() => window.open(nft.nftLink, "_self")}>
                  <h4>{nft.title}</h4>
                </span>
                <div className="nft__item_price">
                  Floor: <span>{nft.price}</span>
                </div>
                <div className="nft__item_action">
                  <span onClick={() => window.open(nft.bidLink, "_self")}>Place a bid</span>
                </div>
                <div className="nft__item_like">
                  <i className="fa fa-book"></i><span title="Count of items">{nft.likes}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
        {this.state.nfts.length !== this.state.dummyData.length &&
          <div className='col-lg-12'>
            <div className="spacer-single"></div>
            <span onClick={() => this.loadMore()} className="btn-main lead m-auto">Load More</span>
          </div>
        }
      </div>
    );
  }
}

export default Collections;