<?php
namespace App;

use Silex\Application;
use Symfony\Component\HttpFoundation\Request;
//use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class IndexController{
    // main action 
	public function indexAction(Request $request, Application $app){
		// get current client IP
		
		$this->checkClientState($app);
		
        return $app['twig']->render('index.html', array());
    }
	
	// collects and returns server services
	private function collectServerServices(){
	
		exec("ip address list  2>&1 && echo $?", $data, $err);
	
		$ipsList = array();
	
		foreach($data as $record){
			
			preg_match("/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/", $record, $ips);
			
			if(count($ips)>0){
				$ipsList[] = $ips[0];
			}
		}
		return $ipsList;
	}
	
	private function checkClientState($app){
	
		$ipAddresses = $this->collectServerServices();

		$ipAddresses = is_array($ipAddresses) ? $ipAddresses : array($ipAddresses);
		
		// get current client Agent / Browser
		
		$sql = "SELECT * FROM address WHERE ipAddress = ?";
		
		foreach($ipAddresses as $ipAddress){
		
			// check where ever client exist in DB
			$address = $app['db']->fetchAssoc($sql, array($ipAddress));
			
			$lastActivity = date('Y-m-d H:i:s');
			
			if($address == false){
				//ADD NEW
				$app['db']->insert('address', array(
					'ipAddress' => $ipAddress,
					'lastActivity' => $lastActivity
				));
				
			}else{
				//UPDATE OLD
				$app['db']->update('address', array(
					'lastActivity' => $lastActivity
				),
				array(
					'id' => $address['id'],
				));
				
			}
		
		//TODO: clean up if needed
		}
		
		$this->cleanUp($app);
	}
	/*
	* removes addressis by time limit 10 min activity
	*/
	private function cleanUp(Application $app){
		// delete
		$date = new \DateTime(date('Y-m-d H:i:s'));
		
		$date->sub(new \DateInterval('PT10M'));
		
		$sql = "DELETE FROM address WHERE lastActivity <= ?";
		
		$stmt = $app['db']->prepare("DELETE FROM address WHERE lastActivity <= ?");
		
		$stmt->bindValue(1, $date, "datetime");
		
		return $stmt->execute();
	
	}
	
	//getter of all connections
	public function getConnection(Request $request, Application $app){
		
		$this->checkClientState($app);
		// $date =  date('Y-m-d H:i:s');
		
		// $currentDate = strtotime($date);
		
		// $oldDate = $currentDate-(60*10);
		
		// $formatDate = date("Y-m-d H:i:s", $oldDate);
		
		// $data = $app['db']->fetchAll('SELECT * FROM address where lastActivity >= ?', array($formatDate));
		$data = $app['db']->fetchAll('SELECT * FROM address ORDER By lastActivity DESC');
		
		return $app->json($data, 200);
	}
	
	//setter
	public function setConnection(Request $request, Application $app){

		$id = $request->attributes->get('id');

		if($id != null){
		
			if (0 === strpos($request->headers->get('Content-Type'), 'application/json')) {
			
				$data = json_decode($request->getContent(), true);
				
				return $this->updateAddressComment($id,  $data['customComment'], $app);
			}
		}
		return false;
	}
	
	//updates comment by its id
	private function updateAddressComment($id, $comment, $app){
		
		$sql = "UPDATE address SET customComment = ? WHERE id = ?";
		
		return $app['db']->executeUpdate($sql, array($comment, (int) $id));
		
	}
}