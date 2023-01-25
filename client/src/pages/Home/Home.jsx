import React, { useEffect } from 'react';
import "./Home.css";
import Banner from '../../components/Banner/Banner';
import Product from '../../components/Product/Product';
import Midbanner from '../../components/Midbanner/Midbanner';
import MetaData from '../../MetaData';
import { getProduct, clearErrors } from '../../redux/actions/productAction';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../components/widgets/Loading/Loading';
import { useAlert } from 'react-alert';

export default function Home() {
  const dispatch = useDispatch();
  const { loading, error, products, productsCount } = useSelector((state) => state.products);
  const Alert = useAlert();

  useEffect(() => {
    if (error) {
      Alert.error(error);
      dispatch(clearErrors());
    }
    
    dispatch(getProduct());
  }, [dispatch, error, Alert]);

  return (
    <>
      <MetaData title="Home | Big Store" />
      <Banner />

      <div className="mt-5">
        <h5 className="product-preview-heading text-center">Products Preview</h5>

        {!loading ? (
          <div className="products-wrapper">
            {products && products.map(product => <Product key={product._id} product={product} />)}
          </div>
        ) : (
          <>
            <Loading />
          </>
        )}
      </div>

      <Midbanner />
    </>
  )
}
