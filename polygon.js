function Point(X,Y){
	this.x = X;			//lets keep them public for ease
	this.y = Y;
	
	/*
	get point()		//wont need
	{
		return this.x + ' ' + this.y ;  //using this one's a bit tricky
	}
	
	set point(x,y)	//wont need
	{
		this.x = x;
		this.y = y;
	}
	*/
}

/*
ppl are saying no method overloading in javascript?

DEMN!

This is the reason JavaScript does not throw an exception; if you pass 2 parameters in a JavaScript function accepting only 1, it’ll just consider the first of the 2 parameters.
*/

function onSegment(p,q,r)
{
	if ( q.x <= Math.max(p.x,r.x) && q.x >= Math.min(p.x,r.x)
	 &&  q.y <= Math.max(p.y,r.y) && q.y >= Math.min(p.y,r.y)	) return true;
 
	else return false;
}

function orientation(p,q,r)
{
	var val = (q.y-p.y)*(r.x-q.x)  -  (q.x-p.x)*(r.y-q.y) ;
	
	if 		(val == 0) return 0;
	else if (val > 0)  return 1;
	else if (val < 0)  return 2;
}

function doIntersect(p1,q1,p2,q2)
{
	var o1 = orientation(p1, q1, p2);
    var o2 = orientation(p1, q1, q2);
    var o3 = orientation(p2, q2, p1);
    var o4 = orientation(p2, q2, q1);
	
	 // General case
    if (o1 != o2 && o3 != o4)
        return true;

    // Special Cases
    // p1, q1 and p2 are colinear and p2 lies on segment p1q1
    if (o1 == 0 && onSegment(p1, p2, q1)) return true;

    // p1, q1 and p2 are colinear and q2 lies on segment p1q1
    if (o2 == 0 && onSegment(p1, q2, q1)) return true;

    // p2, q2 and p1 are colinear and p1 lies on segment p2q2
    if (o3 == 0 && onSegment(p2, p1, q2)) return true;

     // p2, q2 and q1 are colinear and q1 lies on segment p2q2
    if (o4 == 0 && onSegment(p2, q1, q2)) return true;

    return false; // Doesn't fall in any of the above cases
}

function isInside(poly,given)
{
	if (poly.length < 3) return false;

	var extreme = new Point(10000,given.y);
	
	var count = 0;
	var i=0;
	
	do
	{
		var next = (i+1)%poly.length;
		
		if ( doIntersect(poly[i], poly[next], given, extreme) )
		{
		    if (orientation(poly[i], given, poly[next]) == 0)
				return onSegment(poly[i], given, poly[next]);
		    
			count++;
		}
		i = next;
	} while(i != 0);
	
	if (count % 2 == 1) return true;
	else 				return false;
}

/*
var poly = [];					//poly should be global
poly.push(new Point(0,0));
poly.push(new Point(0,10));
poly.push(new Point(10,0));
poly.push(new Point(10,10));


var given = new Point(5,5);
var z = isInside(poly,given);
if(z) console.log("inside");
else  console.log("outside");

var given = new Point(11,11);
var z = isInside(poly,given);
if(z) console.log("inside");
else  console.log("outside");
*/

