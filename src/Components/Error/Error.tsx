import { Container, Card, Text, Spacer } from '@nextui-org/react';

function Error() {
  return (
    <Container fluid css={{ height: '100vh' }} justify='center'>
      <Spacer y={3} />
        <Card>
            <Text h2 weight="bold" color="#f61a1a" css={{ textAlign: 'center' }}>
                You can't use this applicaton
            </Text>
        </Card>
    </Container>
  );
}
export default Error;
