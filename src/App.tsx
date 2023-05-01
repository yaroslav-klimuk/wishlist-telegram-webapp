import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import {
    NextUIProvider,
    Container,
    Row,
    Spacer,
    Text,
    Input,
    useInput,
    FormElement,
    createTheme,
} from '@nextui-org/react';
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
    const { value: name, setValue, bindings } = useInput('');
    const { value: price, bindings: priceBindings } = useInput('');
    const { value: description, bindings: descriptionBindings } = useInput('');
    const { value: link, bindings: linkBindings } = useInput('');
    const { value: imageUrl, bindings: imageBindings } = useInput('');
    const [isValid, setValid] = useState<boolean>(true);

    const isGuest = telegram.initDataUnsafe.user?.username !== process.env.REACT_APP_USERNAME1 && telegram.initDataUnsafe.user?.username !== process.env.REACT_APP_USERNAME2

    const onNameChange = useCallback(
        (e: ChangeEvent<FormElement>) => {
            setValue(e.target.value);
            setValid(true);
        },
        [setValue],
    );

    const sendData = useCallback(async () => {
        const data = {
            name,
            price,
            description,
            link,
            imageUrl,
        };

        try {
            await fetch(`${process.env.REACT_APP_SERVER_URL}/new`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ data, username: telegram.initDataUnsafe.user?.username }),
            });
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
                            {...bindings}
                            fullWidth
                            required
                            bordered={isValid}
                            shadow={false}
                            placeholder="Name"
                            status={isValid ? 'default' : 'error'}
                            color={isValid ? 'primary' : 'error'}
                            helperColor="error"
                            helperText={!isValid ? 'Required' : ''}
                            onChange={onNameChange}
                        />
                    </Row>
                    <Spacer y={1} />
                    <Row>
                        <Input
                            {...priceBindings}
                            type="number"
                            fullWidth
                            required
                            bordered
                            shadow={false}
                            value={price}
                            placeholder="Price"
                            status="default"
                            color="primary"
                            labelRight={<Icon icon={faDollarSign} />}
                        />
                    </Row>
                    <Spacer y={1} />
                    <Row>
                        <Input
                            {...descriptionBindings}
                            fullWidth
                            required
                            bordered
                            shadow={false}
                            value={description}
                            placeholder="Description"
                            status="default"
                            color="primary"
                        />
                    </Row>
                    <Spacer y={1} />
                    <Row>
                        <Input
                            {...linkBindings}
                            fullWidth
                            required
                            bordered
                            shadow={false}
                            value={link}
                            placeholder="Link"
                            status="default"
                            color="primary"
                            labelRight={<Icon icon={faLink} />}
                        />
                    </Row>
                    <Spacer y={1} />
                    <Row>
                        <Input
                            {...imageBindings}
                            fullWidth
                            required
                            bordered
                            shadow={false}
                            value={imageUrl}
                            placeholder="Image URL"
                            status="default"
                            color="primary"
                            labelRight={<Icon icon={faLink} />}
                        />
                    </Row>
                </Container>
            )}
        </NextUIProvider>
    );
}

export default App;
