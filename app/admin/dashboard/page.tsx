"use client";
import React, { memo, useState, useMemo } from "react";
import {
  Box, SimpleGrid, Card, CardBody, Stat, StatLabel, StatNumber, StatHelpText, Text as ChakraText, useColorModeValue, useBreakpointValue,
  Table, Thead, Tbody, Tr, Th, Td, TableCaption, TableContainer, Input,
} from "@chakra-ui/react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";

const statistics = [
  { title: "Total Air Bulan Ini", value: "1,200 m³", detail: "Penurunan 5% dari Bulan lalu", isIncrease: false },
  { title: "Total Pemasukan Bulan Ini", value: "Rp 12,000,000", detail: "Kenaikan 10% dari Bulan lalu", isIncrease: true },
  { title: "Total Pengguna", value: "350", detail: "Peningkatan 3% dari Tahun lalu", isIncrease: true },
  { title: "Pengguna Belum di Cek Bulan Ini", value: "25 Orang", isIncrease: false },
];

const dataAir = [
  { month: "Jan", air: 1000 },
  { month: "Feb", air: 1150 },
  { month: "Mar", air: 1200 },
  { month: "Apr", air: 1100 },
  { month: "May", air: 1250 },
  { month: "Jun", air: 1300 },
  { month: "Jul", air: 1400 },
  { month: "Aug", air: 1350 },
  { month: "Sep", air: 1500 },
  { month: "Oct", air: 1600 },
  { month: "Nov", air: 1450 },
  { month: "Dec", air: 1550 },
];

const dataPemasukan = [
  { month: "Jan", revenue: 10000000 },
  { month: "Feb", revenue: 11000000 },
  { month: "Mar", revenue: 12000000 },
  { month: "Apr", revenue: 11500000 },
  { month: "May", revenue: 13000000 },
  { month: "Jun", revenue: 12500000 },
  { month: "Jul", revenue: 14000000 },
  { month: "Aug", revenue: 13500000 },
  { month: "Sep", revenue: 15000000 },
  { month: "Oct", revenue: 15500000 },
  { month: "Nov", revenue: 14500000 },
  { month: "Dec", revenue: 16000000 },
];

const users = [
  { id: 1, name: "John Doe", usage: 150, bill: 300000, paid: 250000 },
  { id: 2, name: "Jane Smith", usage: 200, bill: 400000, paid: 400000 },
  { id: 3, name: "Mark Wilson", usage: 130, bill: 260000, paid: 260000 },
  { id: 4, name: "Lucy Brown", usage: 170, bill: 340000, paid: 340000 },
  { id: 5, name: "David Miller", usage: 180, bill: 360000, paid: 300000 },
];

const Dashboard: React.FC = memo(() => {
  const cardBg = useColorModeValue("gray.50", "gray.700");
  const cardTextColor = useColorModeValue("gray.600", "gray.100");
  const columns = useBreakpointValue({ base: 1, sm: 2, md: 2, lg: 4 });

  const [filter, setFilter] = useState("");
  const [sortKey, setSortKey] = useState<"usage" | "bill" | "paid">("usage");

  const filteredUsers = useMemo(() => {
    return users
      .filter(user => user.bill > user.paid) // Filter pengguna yang belum melunasi tagihan
      .sort((a, b) => b[sortKey] - a[sortKey]) // Sorting berdasarkan kunci yang dipilih
      .filter(user => user.name.toLowerCase().includes(filter.toLowerCase())); // Filter berdasarkan nama
  }, [filter, sortKey]);

  return (
    <Box p={4}>

      {/* Grid untuk Total Air, Total Pemasukan, Total Pengguna, dan Pengguna Tidak Cek */}
      <SimpleGrid columns={columns} spacing={6} mb={6}>
        {statistics.map((stat, index) => (
          <Card key={index} borderRadius="lg" shadow="md" bg={cardBg} transition="transform 0.2s ease, box-shadow 0.2s ease" _hover={{ transform: "scale(1.05)", shadow: "xl" }}>
            <CardBody>
              <Stat>
                <StatLabel color={cardTextColor} fontWeight="medium">{stat.title}</StatLabel>
                <StatNumber fontSize="2xl" fontWeight="bold" color={stat.isIncrease ? "teal.400" : "orange.400"}>{stat.value}</StatNumber>
                <StatHelpText color={cardTextColor}>{stat.detail}</StatHelpText>
              </Stat>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>

      {/* Chart untuk Air */}
      <Box mt={8} p={6} bg={cardBg} borderRadius="lg" shadow="md" mb={8}>
        <ChakraText fontSize="lg" fontWeight="bold" mb={4} color="teal.500">
          Penggunaan Air Bulanan
        </ChakraText>
        <Box overflowX="auto">
          <LineChart width={1200} height={300} data={dataAir}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="air" stroke="#63b3ed" />
          </LineChart>
        </Box>
      </Box>

      {/* Chart untuk Pemasukan */}
      <Box mt={8} p={6} bg={cardBg} borderRadius="lg" shadow="md" mb={8}>
        <ChakraText fontSize="lg" fontWeight="bold" mb={4} color="teal.500">
          Pemasukan Bulanan
        </ChakraText>
        <Box overflowX="auto">
          <LineChart width={1200} height={300} data={dataPemasukan}>
            <CartesianGrid strokeDasharray="3 4" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="revenue" stroke="#68d391" />
          </LineChart>
        </Box>
      </Box>


      {/* Tabel Pengguna */}
      <Box mt={8} p={6} bg={cardBg} borderRadius="lg" shadow="md">
        <ChakraText fontSize="lg" fontWeight="bold" mb={4} color="teal.500">
          Pengguna yang Belum Melunasi Tagihan
        </ChakraText>
        <Input
          placeholder="Cari pengguna..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          mb={4}
          focusBorderColor="teal.200"
        />
        <TableContainer>
          <Table variant="simple">
            <TableCaption>Daftar pengguna dengan tagihan yang belum dilunasi</TableCaption>
            <Thead>
              <Tr>
                <Th>Nama</Th>
                <Th>Penggunaan Air (m³)</Th>
                <Th isNumeric>Tagihan (Rp)</Th>
                <Th isNumeric>Dibayar (Rp)</Th>
                <Th>Status Pembayaran</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredUsers.map((user) => (
                <Tr key={user.id}>
                  <Td>{user.name}</Td>
                  <Td>{user.usage}</Td>
                  <Td isNumeric>{user.bill}</Td>
                  <Td isNumeric>{user.paid}</Td>
                  <Td>
                    {user.paid >= user.bill ? (
                      <ChakraText color="green.500" fontWeight="bold">Lunas</ChakraText>
                    ) : (
                      <ChakraText color="red.500" fontWeight="bold">Belum Lunas</ChakraText>
                    )}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
});
Dashboard.displayName="Dashboard";
export default Dashboard;

