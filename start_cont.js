var Docker = require('dockerode');
var docker = new Docker({socketPath: '/var/run/docker.sock'});

var auxContainer;
docker.createContainer({
  Image: 'tpnode:1',
  AttachStdin: false,
  AttachStdout: true,
  AttachStderr: true,
  ExposedPorts:
  {
    "50001/tcp": { }

  },
  Tty: true,
  Cmd: ['node', '/Services/SumService.js'],
  OpenStdin: false,
  StdinOnce: false,
  NetworkingConfig:
	{
	EndpointsConfig:
	{
        	isolated_nw:
		{
			IPAddress: "192.168.2.1"
		}
	}
	}
}).then(function(container) {
  auxContainer = container;
  auxContainer.start();
  return auxContainer.attach({stream: true, stdout: true, stderr: true}, function (err, stream) {
    stream.pipe(process.stdout);
  });
});

docker.createContainer({
  Image: 'tpnode:1',
  AttachStdin: false,
  AttachStdout: true,
  AttachStderr: true,
  Tty: true,
  Cmd: ['node', '/Services/CalculatorService.js'],
  OpenStdin: false,
  StdinOnce: false
}).then(function(container) {
  auxContainer = container;
  auxContainer.start();
  return auxContainer.attach({stream: true, stdout: true, stderr: true}, function (err, stream) {
    stream.pipe(process.stdout);
  });
});


