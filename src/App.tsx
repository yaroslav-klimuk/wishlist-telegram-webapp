import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { NextUIProvider, Container, Row, Spacer, Text, Input, createTheme, FormElement } from '@nextui-org/react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faLink, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import Error from './Components/Error';

const telegram = window.Telegram.WebApp;

const darkTheme = createTheme({
    type: 'dark',
    theme: {
        colors: {},
    },
});

const lightTheme = createTheme({
    type: 'light',
    theme: {
        colors: {},
    },
});

const colorSchemes = {
    light: lightTheme,
    dark: darkTheme,
};

function App() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [link, setLink] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [isLoading, setLoading] = useState<boolean>(false);

    const isGuest =
        telegram.initDataUnsafe.user?.username !== process.env.REACT_APP_USERNAME1 &&
        telegram.initDataUnsafe.user?.username !== process.env.REACT_APP_USERNAME2;

    const sendData = useCallback(async () => {
        const data = {
            name,
            price,
            description,
            link,
            imageUrl,
        };

        try {
            telegram.MainButton.showProgress();
            setLoading(true);
            await fetch(`${process.env.REACT_APP_SERVER_URL}/new`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ data, username: telegram.initDataUnsafe.user?.username }),
            });
            telegram.MainButton.hideProgress();
            telegram.close();
        } catch (error) {
            console.log(error);
        }
    }, [description, imageUrl, link, name, price]);

    useEffect(() => {
        telegram.MainButton.setParams({
            text: 'ADD NEW GIFT 🎁',
            color: '#31b545',
        });
        telegram.HapticFeedback.impactOccurred('medium');
    }, []);

    useEffect(() => {
        telegram.MainButton.onClick(sendData);
        return () => {
            telegram.MainButton.offClick(sendData);
        };
    }, [sendData]);

    useEffect(() => {
        if (name || price || description || link || imageUrl) {
            telegram.MainButton.show();
        } else {
            telegram.MainButton.hide();
        }
    }, [description, imageUrl, link, name, price]);

    const onNameChange = (e: ChangeEvent<FormElement>) => {
        setName(e.target.value);
    };

    const onPriceChange = (e: ChangeEvent<FormElement>) => {
        setPrice(e.target.value);
    };

    const onDescriptionChange = (e: ChangeEvent<FormElement>) => {
        setDescription(e.target.value);
    };

    const onLinkChange = (e: ChangeEvent<FormElement>) => {
        setLink(e.target.value);
    };

    const onImageUrlChange = (e: ChangeEvent<FormElement>) => {
        setImageUrl(e.target.value);
    };

    return (
        <NextUIProvider theme={colorSchemes[telegram.colorScheme]}>
            {isGuest ? (
                <Error />
            ) : (
                <Container fluid>
                    <Row fluid justify="center">
                        <Text h2 weight="bold" color="var(--tg-theme-text-color)" css={{ margin: 0 }}>
                            Wishlist ✨
                        </Text>
                    </Row>
                    <Row fluid justify="center">
                        <Text h4 weight="bold" color={telegram.colorScheme === 'light' ? '#687076' : '#D7DBDF'}>
                            Add new item
                        </Text>
                        <Spacer y={3} />
                    </Row>
                    <Row>
                        <Input
                            fullWidth
                            bordered
                            shadow={false}
                            placeholder="Product name"
                            status="default"
                            color="primary"
                            disabled={isLoading}
                            defaultValue={name}
                            onChange={onNameChange}
                        />
                    </Row>
                    <Spacer y={1} />
                    <Row>
                        <Input
                            type="number"
                            fullWidth
                            bordered
                            shadow={false}
                            placeholder="Price"
                            status="default"
                            color="primary"
                            labelRight={<Icon icon={faDollarSign} />}
                            disabled={isLoading}
                            defaultValue={price}
                            onChange={onPriceChange}
                        />
                    </Row>
                    <Spacer y={1} />
                    <Row>
                        <Input
                            fullWidth
                            bordered
                            shadow={false}
                            placeholder="Description"
                            status="default"
                            color="primary"
                            disabled={isLoading}
                            defaultValue={description}
                            onChange={onDescriptionChange}
                        />
                    </Row>
                    <Spacer y={1} />
                    <Row>
                        <Input
                            fullWidth
                            bordered
                            shadow={false}
                            placeholder="Link"
                            status="default"
                            color="primary"
                            labelRight={<Icon icon={faLink} />}
                            disabled={isLoading}
                            defaultValue={link}
                            onChange={onLinkChange}
                        />
                    </Row>
                    <Spacer y={1} />
                    <Row>
                        <Input
                            fullWidth
                            bordered
                            shadow={false}
                            placeholder="Image URL"
                            status="default"
                            color="primary"
                            labelRight={<Icon icon={faLink} />}
                            disabled={isLoading}
                            defaultValue={imageUrl}
                            onChange={onImageUrlChange}
                        />
                    </Row>
                </Container>
            )}
        </NextUIProvider>
    );
}

export default App;
