import React, { useEffect, useState } from 'react';
import { Box, Heading, Textarea, Button, Flex, Text, Spinner, Select } from '@chakra-ui/react';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import supabase from '../../config/supabaseClient';
import { useAuth } from '../../context/authProvider';
import { Link } from 'react-router-dom';

const QueryTool: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [queryResult, setQueryResult] = useState<any[]>([]);
  const [tables, setTables] = useState<any[]>([]);
  const [selectedTable, setSelectedTable] = useState<string>('');
  const [selectedColumns, setSelectedColumns] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const { data, error } = await supabase.supabase.rpc('get_tables_and_columns');

        if (error) {
          console.error('Error fetching tables:', error.message);
        } else {
          setTables(data);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error in fetchTables:', error);
      }
    };

    fetchTables();
  }, []);

  const fetchColumns = async (tableName: string) => {
    const table = tables.find(table => table.table_name === tableName);
    if (table) {
      setSelectedColumns(table.columns);
    }
    else{
      setSelectedColumns([]);
    }
  };

  const handleQuery = async (sqlQuery: string) => {
    try {
      const { data, error } = await supabase.supabase.rpc('execute_query', {
        query_text: `
          SELECT jsonb_agg(row_to_json(query)) AS query
          FROM (${sqlQuery}) AS query;
        `
      });

      if (error) {
        console.error('Error executing query:', error.message);
        setQueryResult([]);
      } else {
        console.log('Query Result:', data[0].result_rows);
        setQueryResult(data[0].result_rows || []);
      }
    } catch (error) {
      console.error('Error in handleQuery:', error);
    }
  };

  const handleExportExcel = () => {
    try {
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(queryResult);
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Query Result');
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, 'query_result.xlsx');
    } catch (error) {
      console.error('Error exporting to Excel:', error);
    }
  };

  if (!isLoggedIn) {
    return (
      <div>
        Please log in to access the admin page. <Link to="/login">Go to Login</Link>
      </div>
    );
  }

  return (
    <>
      <Box
        ml={4}
        mt={6}
        mb={10}
        w="95%"
        mx="auto"
        bg="#EFF4FF"
        p={4}
        borderRadius="8px"
        boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)"
      >
        <Heading as="h2" size="lg" mb={4}>
          Database Query Tool
        </Heading>
        <Box mt={10}>
          <Heading as="h3" size="md" mb={5}>Select Table:</Heading>
          <Select
            placeholder="Select table"
            value={selectedTable}
            onChange={e => {
              setSelectedTable(e.target.value);
              fetchColumns(e.target.value);
            }}
            mb={4}
            overflow={"auto"}
          >
            {tables.map((table, index) => (
              <option key={index} value={table.table_name}>{table.table_name}</option>
            ))}
          </Select>
          {selectedColumns.length > 0 && (
            <>
              <Heading as="h3" size="md" mb={3}>Columns:</Heading>
              <div style={{ overflow: 'auto' }}>
                <table style={{ width: 'auto', maxWidth: '100%', borderCollapse: 'collapse', overflowX: 'auto' }}>
                  <thead>
                    <tr>
                      {selectedColumns.map((column, index) => (
                        <th key={index} style={{ border: '1px solid black', padding: '8px', whiteSpace: 'nowrap', marginBottom:'5px' }}>{column.column_name}</th>
                      ))}
                    </tr>
                  </thead>
                </table>
              </div>
            </>
          )}
        </Box>

        <Heading as="h3" size="md" mb={5}>Query Here:</Heading>
        <Text>Note: use double inverted commas for table names and don't use semicolons at the end.</Text>
        <Textarea
          placeholder="Enter your SQL query here"
          value={query}
          onChange={e => setQuery(e.target.value)}
          border="1px solid black"
          margin={5}
          width="90%"
          height="auto"
        />
        <Flex justifyContent="center">
          <Button colorScheme="teal" onClick={() => handleQuery(query)}>Execute Query</Button>
          <Button colorScheme="teal" onClick={handleExportExcel} ml={3}>Export Excel</Button>
        </Flex>

        {/* Display query results */}
        <Box m={10}>
          <Heading as="h3" size="md" mb={5}>Query Result:</Heading>
          <div style={{ overflow: 'auto', margin: '10px' }}>
            <table style={{ width: 'auto', maxWidth: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  {queryResult.length > 0 && Object.keys(queryResult[0]).map((key, index) => (
                    <th key={index} style={{ border: '1px solid black', padding: '8px', whiteSpace: 'nowrap' }}>{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {queryResult.map((item, index) => (
                  <tr key={index}>
                    {Object.entries(item).map(([key, value], idx) => (
                      <td key={idx} style={{ border: '1px solid black', padding: '8px', maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{String(value)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Box>

        {/* Select table and display available columns */}

      </Box>
    </>
  );
};

export default QueryTool;
