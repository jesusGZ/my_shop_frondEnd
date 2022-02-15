import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { useHistory } from 'react-router';

const KEY = 'pk_test_wk6O7Cc5k3McBIG2Hut2irGs';

const Pay = () => {
	const [stripeToken, setStripeToken] = useState(null);
	const history = useHistory();

	const onToken = (token) => {
		setStripeToken(token);
	};

	useEffect(() => {
		const makeRequest = async () => {
			try {
				const res = await axios.post('http://localhost:9000/payment', {
					tokenId: stripeToken.id,
					amount: 2000,
				});

				console.log(res.data);
				history.push('/success');
			} catch (error) {
				console.log(error);
			}
		};

		stripeToken && makeRequest();
	}, [stripeToken, history]);

	return (
		<div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
			{stripeToken ? (
				<span>Procesando, por favor espere...</span>
			) : (
				<StripeCheckout name="My shop" image="" billingAddress shippingAddress description="Tu total es $" amount={2000} token={onToken} stripeKey={KEY}>
					<button
						style={{
							border: 'none',
							width: 120,
							borderRadius: 5,
							padding: '20px',
							backgroundColor: 'black',
							color: 'while',
							fontWeight: '600',
							cursor: 'pointer',
						}}
					>
						Pagar ahora
					</button>
				</StripeCheckout>
			)}
		</div>
	);
};
