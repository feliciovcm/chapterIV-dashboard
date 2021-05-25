import { Box, Flex, SimpleGrid, Text } from "@chakra-ui/layout";
import { ResponsiveBump } from "@nivo/bump";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
const dataFn = [
  {
    id: "Semana 24/05",
    data: [
      {
        x: 'segunda',
        y: 6,
      },
      {
        x: 'terça',
        y: 110,
      },
      {
        x: 'quarta',
        y: 151,
      },
      {
        x: 'quinta',
        y: 200,
      },
      {
        x: 'sexta',
        y: 71,
      },
    ],
  },
];
export default function Dashboard() {
  return (
    <Flex direction="column" h="100vh">
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <SimpleGrid flex="1" gap="4" minChildWidth="320px" align="flex-start">
          <Box p="8" bg="gray.800" borderRadius={8} h="300px">
            <Text fontSize="lg" mb="4">
              Inscritos da semana
            </Text>
            <ResponsiveBump
              data={dataFn}
              margin={{ top: 10, right: 60, bottom: 40, left: 60 }}
              colors={{ scheme: "spectral" }}
              lineWidth={3}
              activeLineWidth={6}
              inactiveLineWidth={3}
              inactiveOpacity={0.15}
              pointSize={10}
              activePointSize={16}
              inactivePointSize={0}
              pointColor={{ theme: "background" }}
              pointBorderWidth={3}
              activePointBorderWidth={3}
              pointBorderColor={{ from: "serie.color" }}
              axisTop={null}
              axisRight={null}
              axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "",
                legendPosition: "middle",
                legendOffset: 32,
              }}
              axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Inscritos",
                legendPosition: "middle",
                legendOffset: -40,
              }}
            />
          </Box>
          <Box p="8" bg="gray.800" borderRadius={8}>
            <Text fontSize="lg" mb="4">
              Taxa de Abertura
            </Text>
          </Box>
        </SimpleGrid>
      </Flex>
    </Flex>
  );
}
