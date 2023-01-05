import { providers, utils } from "ethers";
import {useEffect, useState} from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';


import './App.css';
function App() {

  const  [transactions, setTransactions] = useState([])
  const mdTheme = createTheme();
  useEffect(()=>{
    async function fetchData() {
        const { EtherscanProvider } = providers
        const { defaultAbiCoder } = utils
        const apiKey = "MYYUQETCW8IGBVKRIVYZX7EQ6PZ91RHZEK";
        const providerName = "goerli"
        const account = "0xD5BeC1e68916558E8307bb3C94A0db4A93DE106a";
        const account1 = "0x833C0de74b9F99c2D76aEe61F64293C84264A09b";
        const provider = new EtherscanProvider(providerName, apiKey);
        // console.log("provider", etherscanProvider);
        // console.log("provider", provider);
        const history = await provider.getHistory(account1)
        setTransactions(history)
        
        // const data = "608060405234801561001057600080fd5b5061039d806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c8063131a06801461003b5780632e64cec114610050575b600080fd5b61004e61004936600461021f565b61006e565b005b6100586100ad565b6040516100659190610291565b60405180910390f35b600080546001810182559080526100a8907f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e563018383610186565b505050565b60606000805480602002602001604051908101604052809291908181526020016000905b8282101561017d5783829060005260206000200180546100f09061032c565b80601f016020809104026020016040519081016040528092919081815260200182805461011c9061032c565b80156101695780601f1061013e57610100808354040283529160200191610169565b820191906000526020600020905b81548152906001019060200180831161014c57829003601f168201915b5050505050815260200190600101906100d1565b50505050905090565b8280546101929061032c565b90600052602060002090601f0160209004810192826101b457600085556101fa565b82601f106101cd5782800160ff198235161785556101fa565b828001600101855582156101fa579182015b828111156101fa5782358255916020019190600101906101df565b5061020692915061020a565b5090565b5b80821115610206576000815560010161020b565b6000806020838503121561023257600080fd5b823567ffffffffffffffff8082111561024a57600080fd5b818501915085601f83011261025e57600080fd5b81358181111561026d57600080fd5b86602082850101111561027f57600080fd5b60209290920196919550909350505050565b6000602080830181845280855180835260408601915060408160051b87010192508387016000805b8381101561031e57888603603f1901855282518051808852835b818110156102ee578281018a01518982018b015289016102d3565b818111156102fe57848a838b0101525b50601f01601f1916969096018701955093860193918601916001016102b9565b509398975050505050505050565b600181811c9082168061034057607f821691505b6020821081141561036157634e487b7160e01b600052602260045260246000fd5b5091905056fea264697066735822122066546af36d48155bbdabfc2c9a14086b85dc68c77c30486a7ea001f6a7f1a12364736f6c63430008070033";
        // const de1 = defaultAbiCoder.decode([ "uint", "tuple(uint256, string)" ], data);
        // const de2 = defaultAbiCoder.decode(
        //   ['uint256', 'address[]', 'address', 'uint256'],
        //   utils.hexDataSlice(data, 4)
        // )
        // console.log("de1", de1);
        // console.log("de2", de2);
        console.log("history", history);
    }
    fetchData();

  },[])
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <h3> Storage</h3>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Tx Hash</TableCell>
                          <TableCell >Data</TableCell>
                          <TableCell >Date</TableCell>
                          <TableCell >Sender</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {transactions.map((row, key) => (
                          <TableRow
                            key={key}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell component="th" scope="row">
                              {`${row.hash.substr(0,5)}...${row.hash.substr(-3)}`}
                            </TableCell>
                            <TableCell>{`${row.data.substr(0,5)}...${row.data.substr(-3)}`}</TableCell>
                            <TableCell>{new Date(row.timestamp * 1000).toLocaleString()}</TableCell>
                            <TableCell>{`${row.from.substr(0,5)}...${row.from.substr(-3)}`}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  
                </Paper>
                <Paper>
                  <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                      {/* <Orders /> */}
                    </Paper>
                  </Grid>
                </Paper>
              </Grid>
              
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;