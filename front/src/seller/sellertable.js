import React, { useEffect } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import MaterialTable from 'material-table';
import FileUpload from './components/FileUpload';
import SendMessage from './components/SendMessage'

export default function App() {
  const [values, setValues] = React.useState({
    data: [{ }],
    select: true
  })

  const [state, setState] = React.useState({
    messagepeople:'',
    selectdata:[{}]
  })

  useEffect(( )=> {//ComponentDidMount -> DB에서 데이터 불러오기
    axios.get('127.0.0.1:27017/data/datawatch', {
    })
    .then((res)=>{
      /*var jsonString = JSON.stringify(res.data);
      var jsonData = JSON.parse(jsonString);*/
      setValues({data : res.data})
      console.log("DB데이터 불러오기 완료");
    });  
  }, []);

  const handleCreate = (data) => {
    var data2 = state.selectdata;
    let currentName = data2.map((data) => data.name);
    let currentPhone = data2.map((data) => data.phone);
    axios.post('127.0.0.1:27017/api/putData', {
      name: currentName,
      phone: currentPhone,
      text: data.name
    })
    console.log("backend로 문자 보내기 요청");
  }

  const addData = (data) => {
    axios.post('127.0.0.1:27017/data/addData', {
      name: data.name,
      phone: data.phone,
      getway : data.getway,
      state : data.state,
    })
    .then((res) => {
        axios.get('127.0.0.1:27017/data/datawatch', {
        })
        .then((res)=>{
          setValues({data : res.data})
          console.log("DB데이터 추가 완료");
        });  
    })
  }

  const updateData = (olddata, newdata) => {
    axios.post('127.0.0.1:27017/data/updateData', {
      oldname: olddata.name,
      oldphone: olddata.phone,
      oldgetway : olddata.getway,
      oldstate : olddata.state,
      newname: newdata.name,
      newphone: newdata.phone,
      newgetway : newdata.getway,
      newstate : newdata.state,
    })
    .then((res) => {
      axios.get('127.0.0.1:27017/data/datawatch', {
      })
      .then((res)=>{
        setValues({data : res.data})
        console.log("DB데이터 업데이트 완료");
      });  
    })
  }

  const deleteData = (data) => {
    axios.post('127.0.0.1:27017/data/deleteData', {
      name: data.name,
      phone: data.phone,
      getway : data.getway,
      state : data.state,
    })
    .then((res) => {
      axios.get('127.0.0.1:27017/data/datawatch', {
      })
      .then((res)=>{
        setValues({data : res.data})
        console.log("DB데이터 삭제 완료");
      });  
  })
  }

  return (
    <div className="App">
        <header className="App-header" align="center">
          <h1 className="App-title" >접수 확인 체크</h1>
        </header>
      <Grid>
       <FileUpload/>
       <MaterialTable
            title="고객 정보"
            columns={[//원래 사용해야하는것
              {title: '이름', field: 'name', filtering: false},
              {title: '휴대폰 번호', field: 'phone', filtering: false},
              {title: '수령 방법', field: 'getway', lookup: { '선불': '선불', '착불': '착불','방문수령': '방문수령'}},
              {title: '상태', field: 'state', lookup: {'입금 확인': '입금 확인', '배송 완료': '배송 완료','입금 안내': '입금 안내', '': '사항 없음'}},
            ]}
            data={values.data}
            editable={{
              onRowAdd: newData =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  addData(newData);
                }, 600);
              }),
              onRowUpdate: (newData, oldData) =>
                new Promise(resolve => {
                  setTimeout(() => {
                    resolve();
                    updateData(oldData, newData);
                  }, 600);
                }),
              onRowDelete: oldData =>
                new Promise(resolve => {
                  setTimeout(() => {
                    resolve();
                    deleteData(oldData);
                  }, 600);
                }),
            }}
            options={{
              filtering: true,
              selection: true,
              columnsButton: true,
            }}
            onSelectionChange={(rows) => setState({
              messagepeople : rows.length,
              selectdata : rows
            })}
          />
          <SendMessage
            onCreate={handleCreate}
            id="messagedrawer"
          />
      </Grid>
    </div>
  );
}

